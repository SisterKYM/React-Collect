import {connect} from 'react-redux';
import React from 'react';
import cx from 'classnames';

import {Button, Input, Modal, ModalCloseButton, Status} from 'elements';
import {
  COMPLETE_PHONE_VERIFICATION,
  START_PHONE_VERIFICATION,
} from 'redux/modules/session/constants';
import {
  completePhoneVerification,
  startPhoneVerification,
} from 'redux/modules/session/actions';
import PhoneIcon from 'theme/images/Phone.svg';

const RESEND_SECONDS_INTERVAL = 45;

class SetUserPhonePage extends React.Component {
  state = {
    verificationCode: '',
    secondsLeftToResend: RESEND_SECONDS_INTERVAL,
  };

  resendTimer = null;

  componentDidMount() {
    this.resendTimer = setInterval(() => {
      this.setState(prevState => ({
        secondsLeftToResend: prevState.secondsLeftToResend - 1,
      }));
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.completePhoneVerificationStatus === 'pending' &&
      this.props.completePhoneVerificationStatus === 'success'
    ) {
      this.props.history.replace('/user/profile/backup-security-code');
    }
  }

  componentWillUnmount() {
    clearInterval(this.resendTimer);
  }

  requestVerificationCode = () => {
    this.setState({
      secondsLeftToResend: RESEND_SECONDS_INTERVAL,
    });

    this.props.onStartPhoneVerification();
  };

  handleChangeVerificationCode = event => {
    this.setState({verificationCode: event.target.value});
  };

  handleVerifyClick = () => {
    this.props.onCompletePhoneVerification({
      token: this.state.verificationCode,
    });

    this.setState({verificationCode: ''});
  };

  handleDismiss = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      startPhoneVerificationStatus,
      completePhoneVerificationStatus,
    } = this.props;
    const codeReadyToResend = this.state.secondsLeftToResend < 1;

    return (
      <Modal flexibleHeight size="EXTRA_SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="pa3 bg-white">
          <h1 className="flex mb3 items-center f-regular">
            Confirm Your Phone Number
          </h1>
          <div className="flex mr2">
            <img height={80} alt="Phone" src={PhoneIcon} />
            <div className="mh3">
              <span className="f6 gray-400">
                Let&apos;s confirm your phone number. We just sent a code to
                your phone number on file. Once you receive it, please enter the
                code below:
              </span>
              <div className="mv2">
                <Input
                  border
                  placeholder="Enter Code"
                  value={this.state.verificationCode}
                  onChange={this.handleChangeVerificationCode}
                />
              </div>
              {startPhoneVerificationStatus ? (
                <Status status={this.props.startPhoneVerificationStatus} />
              ) : (
                <div
                  className={cx(
                    'f6 tint',
                    codeReadyToResend ? 'pointer' : 'not-allowed'
                  )}
                  onClick={
                    codeReadyToResend ? this.requestVerificationCode : undefined
                  }
                >
                  {codeReadyToResend
                    ? 'Resend code'
                    : `Seconds left to resend code: ${this.state.secondsLeftToResend}`}
                </div>
              )}
            </div>
          </div>
          <div className="flex mt2 justify-end">
            {completePhoneVerificationStatus ? (
              <Status status={this.props.completePhoneVerificationStatus} />
            ) : (
              <Button
                backgroundColorSet
                className="bg-brand"
                disabled={this.state.verificationCode.length < 4}
                onClick={this.handleVerifyClick}
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
    completePhoneVerificationStatus:
      state.async.statuses[COMPLETE_PHONE_VERIFICATION],
  }),
  dispatch => ({
    onStartPhoneVerification: () => dispatch(startPhoneVerification()),
    onCompletePhoneVerification: payload =>
      dispatch(completePhoneVerification(payload)),
  })
);

const EnhancedSetUserPhonePage = enhance(SetUserPhonePage);

export default EnhancedSetUserPhonePage;
