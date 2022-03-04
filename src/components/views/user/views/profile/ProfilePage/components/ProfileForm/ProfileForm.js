import {compose, mapProps} from 'recompose';
import {connect} from 'react-redux';
import {formValueSelector, reduxForm} from 'redux-form';
import {isValidNumber} from 'libphonenumber-js';
import PropTypes from 'prop-types';
import BillingHelpers from 'helpers/BillingHelpers';
import React from 'react';
import _ from 'lodash';

import {colors} from 'theme/constants';
import accountTypes from 'helpers/accountTypes';
import config from 'config';
import isFieldNeeded from 'helpers/isFieldNeeded';

import AdditionalInfoWarning from './AdditionalInfoWarning';
import FormAccountDetails from './FormAccountDetails';
import FormOrganizationDetails from './FormOrganizationDetails';
import FormUserDetails from './FormUserDetails';
import PhotoID from './PhotoID';
import ProfileFormPart from './ProfileFormPart';
import ProfilePicture from './ProfilePicture';

const formErrors = {
  BAD_FORMAT: 'Bad format',
  INCORRECT: 'Incorrect',
  LAST_4_SSN: 'Must be 4 digits',
  PAGE_ERROR: 'Please complete required fields below',
  REQUIRED: '*Required',
};
const selector = formValueSelector('ProfileForm');

const ProfileForm = ({
  showOrgFields,
  editDisabled,
  handleSubmit,
  profilePic,
  browser,
  change,
  onCancelAccount,
  onPlanUpdate,
  onSubmit,
  onTransferAccount,
  planHeading,
  session,
  showPhotoID,
  currentPhotoId,
  country,
  phone,
  via,
  startPhoneVerificationStatus,
  onConfirmPhoneNumber,
  onDeleteProfilePicture,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <ProfileFormPart>
      <ProfilePicture picture={profilePic} onDelete={onDeleteProfilePicture} />
    </ProfileFormPart>
    {config.enabledFeatures.subscriptions && (
      <ProfileFormPart
        heading={`Current Plan: ${planHeading}`}
        linkText="Manage Subscription"
        onLinkClick={onPlanUpdate}
      />
    )}
    <ProfileFormPart
      heading="ACCOUNT DETAILS"
      linkText="Cancel Account"
      onLinkClick={onCancelAccount}
    >
      <div className="mt3">
        <FormAccountDetails
          browser={browser}
          onTransferAccount={onTransferAccount}
          showOrgFields={showOrgFields}
          editDisabled={editDisabled}
          country={country}
        />
      </div>
    </ProfileFormPart>
    {Boolean(showOrgFields) && (
      <FormOrganizationDetails
        editDisabled={editDisabled}
        onTransferAccount={onTransferAccount}
        showEin={!_.get(session.user, 'tax_id_provided')}
        country={country}
      />
    )}
    <ProfileFormPart
      heading="PERSONAL DETAILS"
      linkText={showOrgFields ? 'Transfer Account' : ''}
      onLinkClick={showOrgFields ? onTransferAccount : _.noop}
    >
      <div className="mt3">
        <AdditionalInfoWarning
          editDisabled={editDisabled}
          onTransferAccount={onTransferAccount}
          disclaimer="Please enter your legal name and corresponding information."
          justification="Federal regulations require us to collect this information to protect against fraud and to verify the authenticity of the individual managing this account. If we are unable to verify your identity, we may need to request more information."
        />
        <div className="mt3">
          <FormUserDetails
            browser={browser}
            country={country}
            editDisabled={editDisabled}
            fieldsNeeded={session.fieldsNeeded}
            startPhoneVerificationStatus={startPhoneVerificationStatus}
            showDOB={!_.get(session.user, 'dob.month')}
            phoneNumberVerified={
              !session.phoneJustReset &&
              (_.get(session.user, 'profile.phone.verified') ||
                session.phoneJustVerified)
            }
            onConfirmPhoneNumber={() => {
              onConfirmPhoneNumber(phone, via);
            }}
          />
        </div>
        {showPhotoID && (
          <div className="mt3 pb4">
            <PhotoID
              name="photoID"
              filePath={currentPhotoId}
              onDelete={() => change('photoID', '')}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        input:disabled,
        select:disabled {
          background-color: ${colors.lightGray};
        }
      `}</style>
    </ProfileFormPart>
  </form>
);

ProfileForm.propTypes = {
  onCancelAccount: PropTypes.func,
  onPlanUpdate: PropTypes.func,
  onSubmit: PropTypes.func,
  onTransferAccount: PropTypes.func,
  session: PropTypes.shape({
    isProUser: PropTypes.bool,
    isTeamUser: PropTypes.bool,
  }),
  showPhotoID: PropTypes.bool,
};

const enhance = compose(
  reduxForm({
    form: 'ProfileForm',
    validate: (values, props) => {
      const emailRegex = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d-AZa-z-]+\.)+[A-Za-z]{2,}))$/;
      const err = {};
      const fieldsNeeded = _.get(props, 'session.fieldsNeeded', []);
      const accountVerified = !_.get(props, 'session.user.editable', true);
      const phoneNumberVerified =
        !_.get(props, 'session.phoneJustReset') &&
        (_.get(props, 'session.user.profile.phone.verified') ||
          _.get(props, 'session.phoneJustVerified'));

      if (!values.email) {
        err.email = formErrors.REQUIRED;
      } else if (!emailRegex.test(values.email)) {
        err.email = formErrors.INCORRECT;
      }
      if (!values.display_name) {
        err.display_name = formErrors.REQUIRED;
      }

      if (!phoneNumberVerified) {
        if (!values.phone) {
          err.phone = formErrors.REQUIRED;
        } else if (!isValidNumber(values.phone)) {
          err.phone = formErrors.INCORRECT;
        }
      }

      if (values.accountType === accountTypes.ORGANIZATION) {
        if (!values.orgCity) {
          err.orgCity = formErrors.REQUIRED;
        }
        if (!values.orgStreet) {
          err.orgStreet = formErrors.REQUIRED;
        }
        if (!values.orgState) {
          err.orgState = formErrors.REQUIRED;
        }
        if (!values.orgZip) {
          err.orgZip = formErrors.REQUIRED;
        }
        if (!values.einTaxID) {
          err.einTaxID = formErrors.REQUIRED;
        }
      }

      if (!accountVerified) {
        if (!values.firstName) {
          err.firstName = formErrors.REQUIRED;
        }
        if (!values.lastName) {
          err.lastName = formErrors.REQUIRED;
        }
        if (!values.userCity) {
          err.userCity = formErrors.REQUIRED;
        }
        if (!values.userStreet) {
          err.userStreet = formErrors.REQUIRED;
        }
        if (!values.userState) {
          err.userState = formErrors.REQUIRED;
        }
        if (!values.userZip) {
          err.userZip = formErrors.REQUIRED;
        }
      }

      if (!values.dateOfBirth) {
        err.dateOfBirth = formErrors.REQUIRED;
      } else if (!/(?:\d{2}\/){2}\d{4}/.test(values.dateOfBirth)) {
        err.dateOfBirth = 'MM/DD/YYYY';
      }
      if (isFieldNeeded(fieldsNeeded, 'ssn_last_4')) {
        if (!values.last4SSN) {
          err.last4SSN = formErrors.REQUIRED;
        } else if (`${values.last4SSN}`.length !== 4) {
          err.last4SSN = formErrors.LAST_4_SSN;
        }
      }
      if (
        isFieldNeeded(fieldsNeeded, '.id_number') &&
        !values.personalIdNumber
      ) {
        err.personalIdNumber = formErrors.REQUIRED;
      }
      if (
        isFieldNeeded(fieldsNeeded, 'verification.document') &&
        !values.photoID
      ) {
        err.photoID = formErrors.REQUIRED;
      }

      if (_.values(err).length !== 0) {
        props.setFormError(formErrors.PAGE_ERROR);
      } else {
        props.setFormError(null);
      }
      Object.keys(err).forEach((key) => props.touch(key));

      return err;
    },
  }),
  connect((state) => {
    const photoFile = selector(state, 'photoID');

    return {
      currentPhotoId: photoFile ? URL.createObjectURL(photoFile) : null,
      showOrgFields:
        selector(state, 'accountType') === accountTypes.ORGANIZATION,
      phone: selector(state, 'phone'),
      via: selector(state, 'via'),
    };
  }),
  mapProps((props) => ({
    ...props,
    planHeading: BillingHelpers.getFriendlyPlanName(
      _.get(props, 'session.capabilities.plan')
    ),
    editDisabled: !_.get(props, 'session.user.editable', true),
    showPhotoID: isFieldNeeded(
      _.get(props, 'session.fieldsNeeded', []),
      'verification.document'
    ),
  }))
);

const EnhancedProfileForm = enhance(ProfileForm);

export default EnhancedProfileForm;
