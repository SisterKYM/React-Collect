import {compose, withHandlers, withState} from 'recompose';
import {connect} from 'react-redux';
import {every, omit, reject, uniqBy} from 'lodash';
import {useDropzone} from 'react-dropzone';
import Papa from 'papaparse';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import {Button} from 'elements';
import {errorAlert} from 'redux/modules/growl/actions';

import {
  UploadMemberInvitesProgress,
  UploadMemberInvitesSuccess,
  UploadMembersCsvResultsTable,
} from './components';
import {isMemberValid} from '../../lib';
import MemberToolsTemplateCsv from './assets/member-tools-template.csv';

const enhance = compose(
  connect(null, (dispatch) => ({
    onErrorAlert: (payload) => dispatch(errorAlert(payload)),
  })),
  withState('isExpanded', 'setIsExpanded', false),
  withState('uploadedMembersSubmitted', 'setUploadedMembersSubmitted', false),
  withState('uploadedFileName', 'setUploadedFileName', ''),
  withState('uploadedMembers', 'setUploadedMembers', []),
  withState('members', 'setMembers', []),
  withHandlers({
    handleToggleIsExpanded: (props) => () => {
      props.setIsExpanded((prevIsExpanded) => !prevIsExpanded);
    },
    handleCsvDrop: (props) => (acceptedFiles) => {
      const csvFile = acceptedFiles[0];

      if (csvFile) {
        props.setUploadedFileName(csvFile.name);

        Papa.parse(csvFile, {
          header: true,
          skipEmptyLines: 'greedy',
          trimHeader: true,
          transform: (val) => {
            if (!val) {
              return undefined;
            }
            if (typeof val !== 'string') {
              return val;
            }
            if (val.length === 0) {
              return undefined;
            }

            return val.trim();
          },
          complete: ({data}) => {
            const uploadedMembers = data
              .map((member) =>
                omit(
                  {
                    ...member,
                    address: {
                      city: member['address/city'],
                      line1: member['address/line1'],
                      state: member['address/state'],
                      country: member['address/country'],
                      postal_code: member['address/postal_code'],
                    },
                    dob: every(
                      [
                        member['dob/month'],
                        member['dob/day'],
                        member['dob/year'],
                      ],
                      (dobComponent) => !dobComponent
                    )
                      ? undefined
                      : `${member['dob/month']}/${member['dob/day']}/${member['dob/year']}`,
                    bankAccount: {
                      accountNumber: member['bank_account/account_number'],
                      routingNumber: member['bank_account/routing_number'],
                    },
                  },
                  [
                    'address/city',
                    'address/line1',
                    'address/line2',
                    'address/state',
                    'address/country',
                    'address/postal_code',
                    'dob/day',
                    'dob/month',
                    'dob/year',
                    'bank_account/account_number',
                    'bank_account/routing_number',
                  ]
                )
              )
              .map((member) => ({
                ...member,
                address: every(
                  member.address,
                  (addressComponent) => !addressComponent
                )
                  ? undefined
                  : member.address,
                bankAccount: every(
                  member.bankAccount,
                  (bankAccountComponent) => !bankAccountComponent
                )
                  ? undefined
                  : member.bankAccount,
              }));

            const uniqueUploadedMembers = uniqBy(uploadedMembers, 'email');

            props.setUploadedMembers(uniqueUploadedMembers);
            props.setMembers(uniqueUploadedMembers);
          },
        });
      }
    },
    handleChangeMembers: (props) => (members) => {
      props.setMembers(members);
    },
    handleCancel: (props) => () => {
      if (props.addMemberInvitesStatus === 'pending') {
        props.onCancelAddMemberInvites();
      } else if (props.uploadedFileName.length === 0) {
        props.setIsExpanded(false);

        return;
      }

      props.setUploadedMembers([]);
      props.setUploadedMembersSubmitted(false);
      props.setMembers([]);
      props.setUploadedFileName('');
    },
    handleSubmit: (props) => () => {
      const membersWithErrors = reject(props.members, isMemberValid);
      const uploadedMembersWithErrors = reject(
        props.uploadedMembers,
        isMemberValid
      );

      if (
        props.uploadedMembersSubmitted &&
        uploadedMembersWithErrors.length === 0
      ) {
        const membersToAdd = props.uploadedMembers.map((member) => {
          const dobMoment = member.dob
            ? moment(member.dob, 'MM/DD/YYYY')
            : null;

          return {
            ...member,
            dob: dobMoment
              ? {
                  day: String(dobMoment.date()),
                  month: String(dobMoment.month() + 1),
                  year: String(dobMoment.year()),
                }
              : undefined,
          };
        });

        props.onAddMemberInvites(membersToAdd);
      } else if (
        props.uploadedMembersSubmitted &&
        membersWithErrors.length === 0
      ) {
        const uploadedMembersWithoutErrors = props.uploadedMembers.filter((x) =>
          isMemberValid(x)
        );

        props.setUploadedMembers([
          ...uploadedMembersWithoutErrors,
          ...props.members,
        ]);
      } else if (!props.uploadedMembersSubmitted) {
        props.setUploadedMembersSubmitted(true);
      } else if (props.uploadedMembersSubmitted) {
        props.onErrorAlert({
          title: 'Error',
          body: 'Please correct errors highlighted in orange.',
        });
      }
    },
  }),
  React.memo
);

const UploadMemberInvitesCsv = ({
  isExpanded,
  uploadedMembersSubmitted,
  addMemberInvitesStatus,
  uploadedFileName,
  uploadedMembers,
  processedMemberCount,
  handleToggleIsExpanded,
  handleCsvDrop,
  handleChangeMembers,
  handleCancel,
  handleSubmit,
}) => {
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    onDrop: handleCsvDrop,
  });

  return (
    <div>
      <span className="tint pointer" onClick={handleToggleIsExpanded}>
        Upload Member Data
      </span>
      {Boolean(isExpanded) && (
        <div className="pa3 mt3 bg-gray-200">
          {(() => {
            if (addMemberInvitesStatus === 'pending') {
              return (
                <UploadMemberInvitesProgress
                  memberCount={uploadedMembers.length}
                  processedMemberCount={processedMemberCount}
                />
              );
            }

            if (addMemberInvitesStatus === 'success') {
              return (
                <UploadMemberInvitesSuccess
                  memberCount={uploadedMembers.length}
                />
              );
            }

            if (uploadedMembersSubmitted) {
              return (
                <UploadMembersCsvResultsTable
                  validMembersCount={
                    uploadedMembers.filter((x) => isMemberValid(x)).length
                  }
                  initialMembers={uploadedMembers}
                  onChangeMembers={handleChangeMembers}
                />
              );
            }

            return (
              <>
                {' '}
                <p className="f6 lh-copy">
                  The following fields are required for account creation: first
                  name, last name, email address, currency, account type.
                  <br />
                  Other optional fields include: physical address, Tax ID,
                  organization name, bank account information and date of birth.{' '}
                  <a href={MemberToolsTemplateCsv}>Click here</a> to download a
                  <br />
                  CSV template for upload.
                </p>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="dropzone flex mt2 justify-center items-center bw1 b--dashed br2 b--gray-400 bg-white pointer">
                    {uploadedFileName || 'Browse for your csv'}
                  </div>
                </div>
              </>
            );
          })()}
          <div
            className={cx(
              'flex items-center',
              addMemberInvitesStatus === 'pending' ? 'mt5' : 'mt2'
            )}
          >
            {(addMemberInvitesStatus === 'pending' ||
              addMemberInvitesStatus === 'success') && (
              <div className="f-regular avenir-roman">
                Total Accounts Processed:{' '}
                {addMemberInvitesStatus === 'pending'
                  ? processedMemberCount
                  : uploadedMembers.length}
              </div>
            )}
            {addMemberInvitesStatus !== 'success' && (
              <div className="flex flex-auto justify-end items-center">
                <Button
                  small
                  backgroundColorSet
                  className="mr2 bg-gray-400"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                {addMemberInvitesStatus !== 'pending' && (
                  <Button
                    small
                    type="submit"
                    disabled={uploadedMembers.length === 0}
                    onClick={handleSubmit}
                  >
                    {reject(uploadedMembers, isMemberValid).length === 0 &&
                    uploadedMembersSubmitted
                      ? 'Create Accounts and Send Welcome Emails'
                      : 'Submit'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .dropzone {
          max-width: 32rem;
          height: 16rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedUploadMemberInvitesCsv = enhance(UploadMemberInvitesCsv);

export default EnhancedUploadMemberInvitesCsv;
