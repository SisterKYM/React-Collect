import {compose, lifecycle, withHandlers, withState} from 'recompose';
import {find, isEqual, reject} from 'lodash';
import React from 'react';

import {isMemberValid} from '../../../../lib';
import UploadMembersCsvResultsTableRow from './UploadMembersCsvResultsTableRow';

const UploadMembersCsvResultsTable = ({
  validMembersCount,
  initialMembers,
  members,
  handleChangeMemberAtIdx,
}) => (
  <div>
    <div className="mv2">
      <h5 className="mb2">Upload Results</h5>
      <p className="f6 lh-copy">
        {validMembersCount === initialMembers.length
          ? "Congrats! You've successfully uploaded all new members. Click the button below to send member welcome emails."
          : `The following is the result of your member upload. Welcome emails have not yet been sent.${'\n'}Please fix the errors below to send member welcome emails.`}
      </p>
      <div className="mt4 f6">
        <p>
          <span className="fw7">SUCCESS:</span> {validMembersCount} new{' '}
          {`member${validMembersCount === 1 ? '' : 's'}`} successfully uploaded
        </p>
        <p className="mt2">
          <span className="fw7">ERRORS:</span>{' '}
          {validMembersCount === initialMembers.length
            ? '0'
            : 'The following members were not added due to the errors noted below:'}
        </p>
      </div>
    </div>
    {validMembersCount === initialMembers.length ? (
      <div className="mt4" />
    ) : (
      <table className="dt--fixed collapse mt2 f7">
        <thead className="white bg-gray-500">
          <tr className="ba b--gray-300">
            {[
              'First Name',
              'Last Name',
              'Email Address',
              'Currency',
              'Account Type',
              'Tax ID',
              'Org Name',
              'Date of birth',
              'Street Address',
              'City',
              'State',
              'Country',
              'Zip/Postal Code',
            ].map(title => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className="gray-400 bg-white">
          {members.map((member, idx) => {
            const handleChangeMember = nextMember => {
              handleChangeMemberAtIdx(idx, nextMember);
            };

            const initialMember = find(initialMembers, {
              email: member.email,
            });

            return (
              Boolean(initialMember) && (
                <UploadMembersCsvResultsTableRow
                  key={member.email}
                  isLeading={idx === 0}
                  initialMember={find(initialMembers, {
                    email: member.email,
                  })}
                  member={member}
                  onChangeMember={handleChangeMember}
                />
              )
            );
          })}
        </tbody>
      </table>
    )}
    <style jsx>{`
      thead:after {
        content: '';
        display: block;
        height: 1em;
        width: 100%;
        background-color: #f2f2f2;
      }
      th {
        max-width: 5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      }
    `}</style>
  </div>
);

const enhance = compose(
  withState('members', 'setMembers', props =>
    reject(props.initialMembers, isMemberValid)
  ),
  withHandlers({
    handleChangeMemberAtIdx: props => (idx, nextMember) => {
      props.setMembers(prevMembers => {
        const nextMembers = prevMembers.slice();
        nextMembers[idx] = nextMember;

        return nextMembers;
      });
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (!isEqual(prevProps.members, this.props.members)) {
        this.props.onChangeMembers(this.props.members);
      }
    },
  }),
  React.memo
);

const EnhancedUploadMembersCsvResultsTable = enhance(
  UploadMembersCsvResultsTable
);

export default EnhancedUploadMembersCsvResultsTable;
