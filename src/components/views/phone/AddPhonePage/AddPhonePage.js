import {connect} from 'react-redux';
import {get} from 'lodash';
import React from 'react';

import {Button, Modal, ModalCloseButton, Status} from 'elements';
import {START_PHONE_VERIFICATION} from 'redux/modules/session/constants';
import {startPhoneVerification} from 'redux/modules/session/actions';
import PhoneIcon from 'theme/images/Phone.svg';

class AddPhonePage extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.startPhoneVerificationStatus === 'pending' &&
      this.props.startPhoneVerificationStatus === 'success'
    ) {
      this.props.history.push(`/user/profile/set-phone`);
    }
  }

  handleDismiss = () => {
    const prevPath = this.props.location.pathname.split('/phone/')[0];

    this.props.history.push(prevPath);
  };

  handleContinue = () => {
    if (this.props.phoneNumberFilled) {
      this.props.onStartPhoneVerification();
    } else {
      this.props.history.push('/user/profile');
    }
  };

  render() {
    return (
      <Modal flexibleHeight size="SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="pa3 bg-white">
          <h1 className="flex mb3 items-center f-regular">
            Add a Phone Number to Proceed
          </h1>
          <div className="flex mr2">
            <img height={80} alt="Phone" src={PhoneIcon} />
            <div className="mh3">
              <span className="f6 gray-400">
                Before you can proceed, we need to verify that it&apos;s you.
                This can only be done after you add a phone number to your
                profile. To add this phone number now, click
                &quot;continue&quot; below.
              </span>
            </div>
          </div>
          <div className="flex mt2 justify-end">
            {this.props.startPhoneVerificationStatus === 'pending' ? (
              <Status status={this.props.startPhoneVerificationStatus} />
            ) : (
              <Button
                backgroundColorSet
                className="bg-brand"
                onClick={this.handleContinue}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

const enhance = connect(
  state => ({
    startPhoneVerificationStatus:
      state.async.statuses[START_PHONE_VERIFICATION],
    phoneNumberFilled:
      Boolean(get(state.session, 'user.profile.phone.phone_number')) &&
      Boolean(get(state.session, 'user.profile.phone.country_code')),
  }),
  dispatch => ({
    onStartPhoneVerification: () => dispatch(startPhoneVerification()),
  })
);

const EnhancedAddPhonePage = enhance(AddPhonePage);

export default EnhancedAddPhonePage;
