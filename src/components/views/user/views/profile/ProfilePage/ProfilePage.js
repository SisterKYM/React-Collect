import {change} from 'redux-form';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {parseNumber} from 'libphonenumber-js';
import React from 'react';
import config from 'config';
import _ from 'lodash';

import {Button, Status} from 'elements';
import {
  GET_SESSION,
  REQUEST_VERIFICATION_CODE,
  START_PHONE_VERIFICATION,
  UPDATE_USER,
} from 'redux/modules/session/constants';
import {UserBasePage} from 'views/user/components';
import {asyncConnect} from 'helpers';
import {errorAlert} from 'redux/modules/growl/actions';
import {
  getSession,
  startPhoneVerification,
  requestVerificationCode,
  updateUser,
} from 'redux/modules/session/actions';
import UserDobHelpers from 'helpers/UserDobHelpers';
import accountTypes from 'helpers/accountTypes';

import {ProfileForm} from './components';

const getUpdateUserPayload = (values, form) => {
  const payload = {
    email: values.email,
    display_name: values.display_name,
    first_name: values.firstName,
    last_name: values.lastName,
    personal_address: {
      city: values.userCity,
      country: form.country,
      line1: values.userStreet,
      line2: null,
      state: values.userState,
      postal_code: values.userZip,
    },
    entity_type: values.accountType,
    profile: _.omit(values.profile, ['phone']),
    uploads: {},
  };

  if (values.orgCity || values.orgState || values.orgStreet || values.orgZip) {
    payload.business_address = {
      city: values.orgCity,
      country: form.country,
      line1: values.orgStreet,
      line2: null,
      state: values.orgState,
      postal_code: values.orgZip,
    };
  }
  if (values.einTaxID) {
    payload.business_tax_id = values.einTaxID;
  }
  if (values.dateOfBirth) {
    payload.dob = UserDobHelpers.parse(values.dateOfBirth);
  }
  if (values.last4SSN) {
    payload.ssn_last_4 = values.last4SSN;
  }
  if (values.personalIdNumber) {
    payload.personal_id_number = values.personalIdNumber;
  }
  if (values.photoID) {
    payload.uploads.verification_document = values.photoID;
  }

  return payload;
};

class ProfilePage extends React.PureComponent {
  state = {
    formError: null,
  };

  profileFormRef = React.createRef();

  updateUserPayload = null;

  resettingPhone = false;

  componentDidUpdate(prevProps) {
    if (
      prevProps.startPhoneVerificationStatus === 'pending' &&
      this.props.startPhoneVerificationStatus === 'success'
    ) {
      this.props.history.push('/user/profile/set-phone');
    } else if (
      prevProps.requestVerificationCodeStatus === 'pending' &&
      this.props.requestVerificationCodeStatus === 'success'
    ) {
      if (this.updateUserPayload) {
        const pathname = _.get(this.props, 'location.pathname', '');

        this.props.history.push({
          pathname: `${pathname}/phone/verify`,
          state: {
            verifyActionType: UPDATE_USER,
            payload: this.updateUserPayload,
          },
        });

        this.updateUserPayload = null;
      } else if (this.resettingPhone) {
        this.resettingPhone = true;

        this.props.history.push('/user/profile/reset-phone');
      }
    }
  }

  isPhoneVerified = () =>
    process.env.REACT_APP_TWO_FACTOR_DISABLED ||
    (!_.get(this.props, 'session.phoneJustReset') &&
      (_.get(this.props, 'session.user.profile.phone.verified') ||
        _.get(this.props, 'session.phoneJustVerified')));

  handleConfirmPhoneNumber = (phoneNumber, via) => {
    if (phoneNumber) {
      const parsedPhoneNumber = parseNumber(phoneNumber, {extended: true});

      if (parsedPhoneNumber.valid) {
        this.props.startPhoneVerification({
          countryCode: parsedPhoneNumber.countryCallingCode,
          phoneNumber: parsedPhoneNumber.phone,
          via,
        });
      }
    }
  };

  handleClickResetPhone = () => {
    this.resettingPhone = true;

    this.props.requestVerificationCode();
    this.clearPhone();
  };

  handleSubmit = (values, dispatch, form) => {
    if (
      !process.env.REACT_APP_TWO_FACTOR_DISABLED &&
      values.email !== _.get(this.props, 'session.user.email')
    ) {
      this.updateUserPayload = getUpdateUserPayload(values, form);
      this.props.requestVerificationCode();
    } else if (!this.isPhoneVerified() && values.phone) {
      this.props.errorAlert({
        title: 'Confirm Your Phone',
        body: 'Click "Confirm" to confirm your phone number.',
      });
    } else {
      const payload = getUpdateUserPayload(values, form);
      this.props.updateUser(payload);
    }
  };

  handleDeleteProfilePicture = () => {
    this.props.updateUser({profile_pic_id: null});
  };

  handleClickSave = () => {
    this.profileFormRef.current.submit();
  };

  handleCancelAccount = () => {
    this.props.history.push('/user/profile/cancel');
  };

  handleTransferAccount = () => {
    const defaultText = `mailto:${config.strings.supportEmail}?subject=Account%20Transfer%20Request&body=We%20are%20happy%20to%20help%20you%20transfer%20your%20account%20to%20a%20new%20owner.%20Please%20note%2C%20this%20will%20not%20modify%20the%20organization%20information%2C%20and%20will%20only%20update%20the%20individual%20details.%20%0A%0ATo%20proceed%2C%20please%20send%20us%20the%20following%20information%3A%0ACurrent%20Account%20Holder%3A%0A%20-%20Name%0A%20-%20Email%20address%20on%20account%0A%0AIncoming%20Account%20Holder%3A%0A%20-%20Legal%20Name%0A%20-%20Address%0A%20-%20Phone%0A%20-%20DOB%0A%20-%20Email%20address%20(if%20changing)%0A%0AOnce%20you've%20provided%20this%20information%2C%20we%20will%20be%20in%20touch%20confirming%20the%20successful%20transfer%20of%20your%20account.`;
    const companyText = `mailto:${config.strings.supportEmail}?subject=Account%20Transfer%20Request%3A%20Organization&body=We%20are%20happy%20to%20help%20you%20transfer%20your%20account%20to%20a%20new%20owner.%20Please%20note%20that%20this%20will%20not%20modify%20the%20organization%20information%20and%20will%20only%20update%20the%20individual%20details.%0A%0ATo%20proceed%2C%20please%20send%20us%20the%20following%20information%3A%0A%0ACurrent%20Account%20Holder%3A%0A%0AName%3A%0AEmail%20address%20on%20account%3A%0A%0A%0ANew%20Account%20Holder%3A%0A%0ALegal%20Name%3A%0AAddress%3A%0ADOB%3A%0A%0A%0APlease%20note%20that%20Cheddar%20Up%20uses%20two-factor%20authentication%20for%20your%20security.%20You%20will%20need%20access%20to%20the%20current%20mobile%20phone%20number%20on%20this%20account%20in%20order%20to%20change%20the%20email%20address%2C%20password%20or%20bank%20account%20on%20file.`;
    let textToUse = defaultText;
    if (_.get(this.props, 'session.user.entity_type') === 'company') {
      textToUse = companyText;
    }
    window.open(textToUse, '_blank');
  };

  handlePlanUpdate = () => {
    this.props.history.push('/user/profile/i/plans');
  };

  clearPhone = () => {
    this.props.change('ProfileForm', 'phone', '');
  };

  handleSetFormError = formError => {
    this.setState({formError});
  };

  handleSubmitFail = () => {
    this.setState({formError: 'Please complete required fields below'});
  };

  render() {
    const {session} = this.props;
    const loading =
      _.get(this.props, `async.statuses.${UPDATE_USER}`) === 'pending';
    const phoneVerified = this.isPhoneVerified();
    const serverError = _.get(this.props, `async.errors.${UPDATE_USER}`);
    const user = _.get(session, 'user');

    return (
      <UserBasePage
        currentUrl={this.props.location.pathname}
        error={serverError || this.state.formError}
        fixedBottom={
          <div className="flex pa3 justify-end items-center bg-white bt b--gray-300">
            {loading && (
              <div className="pr4">
                <Status status="pending" />
              </div>
            )}
            <Button
              backgroundColorSet
              disabled={loading || !phoneVerified}
              className="profile-page-save-button flex justify-center items-center tc bg-brand"
              onClick={this.handleClickSave}
            >
              Save
            </Button>
            <style jsx>{`
              :global(.profile-page-save-button) {
                min-width: 166px;
              }
            `}</style>
          </div>
        }
        heading="Profile"
      >
        <ProfileForm
          forceUnregisterOnUnmount
          ref={this.profileFormRef}
          profilePic={_.get(user, 'profile_pic')}
          initialValues={{
            accountType: _.get(user, 'entity_type') || accountTypes.INDIVIDUAL,
            dateOfBirth: UserDobHelpers.toString(_.get(user, 'dob', '')),
            email: _.get(user, 'email', ''),
            firstName: _.get(user, 'first_name', ''),
            last4SSN: _.get(user, 'ssn_last_4_provided') || '',
            einTaxID: _.get(user, 'tax_id_provided') || '',
            personalIdNumber: _.get(user, 'personal_id_number_provided') || '',
            lastName: _.get(user, 'last_name', ''),
            display_name: _.get(user, 'display_name', ''),
            profile: _.get(user, 'profile', {}),
            orgCity: _.get(user, 'business_address.city', ''),
            orgState: _.get(user, 'business_address.state', ''),
            orgStreet: _.get(user, 'business_address.line1', ''),
            orgZip: _.get(user, 'business_address.postal_code', ''),
            userCity: _.get(user, 'personal_address.city', ''),
            userState: _.get(user, 'personal_address.state', ''),
            userStreet: _.get(user, 'personal_address.line1', ''),
            userZip: _.get(user, 'personal_address.postal_code', ''),
          }}
          browser={this.props.browser}
          destroyOnUnmount={false}
          country={_.get(user, 'currency', 'usd') === 'usd' ? 'US' : 'CA'}
          onCancelAccount={this.handleCancelAccount}
          setFormError={this.handleSetFormError}
          onPlanUpdate={this.handlePlanUpdate}
          onSubmit={this.handleSubmit}
          onSubmitFail={this.handleSubmitFail}
          onTransferAccount={this.handleTransferAccount}
          session={session}
          startPhoneVerificationStatus={this.props.startPhoneVerificationStatus}
          onConfirmPhoneNumber={this.handleConfirmPhoneNumber}
          onDeleteProfilePicture={this.handleDeleteProfilePicture}
        />
        {!process.env.REACT_APP_TWO_FACTOR_DISABLED && phoneVerified && (
          <div className="mv3 f6">
            Two-Factor Authentication Phone Number: On File{' '}
            <span className="tint pointer" onClick={this.handleClickResetPhone}>
              Reset
            </span>
          </div>
        )}
      </UserBasePage>
    );
  }
}

const enhance = compose(
  asyncConnect(props => {
    const state = props.store.getState();
    const user = _.get(state, 'session.user');

    return user
      ? []
      : [
          {
            key: GET_SESSION,
            promise: getSession,
          },
        ];
  }),
  connect(
    ({form, async, browser, session}) => ({
      form: form.ProfileForm,
      async,
      browser,
      session,
      requestVerificationCodeStatus: async.statuses[REQUEST_VERIFICATION_CODE],
      startPhoneVerificationStatus: async.statuses[START_PHONE_VERIFICATION],
    }),
    {
      errorAlert,
      startPhoneVerification,
      requestVerificationCode,
      updateUser,
      change,
    }
  )
);

const EnhancedProfilePage = enhance(ProfilePage);

export default EnhancedProfilePage;
