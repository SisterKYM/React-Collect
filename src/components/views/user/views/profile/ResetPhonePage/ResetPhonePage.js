import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import cx from 'classnames';

import {Button, Input, Modal, ModalCloseButton, Status} from 'elements';
import {
  REQUEST_VERIFICATION_CODE,
  RESET_PHONE,
} from 'redux/modules/session/constants';
import {
  requestVerificationCode,
  resetPhone,
} from 'redux/modules/session/actions';
import PhoneIcon from 'theme/images/Phone.svg';

const RESEND_SECONDS_INTERVAL = 45;

class ResetPhonePage extends React.Component {
  state = {
    verificationCode: '',
    password: '',
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
      prevProps.resetPhoneStatus === 'pending' &&
      this.props.resetPhoneStatus === 'success'
    ) {
      this.props.history.push({
        pathname: '/user/profile',
        state: {
          keepGrowls: true,
        },
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.resendTimer);
  }

  requestVerificationCode = () => {
    this.setState({
      secondsLeftToResend: RESEND_SECONDS_INTERVAL,
    });

    this.props.onRequestVerificationCode();
  };

  handleChangeVerificationCode = event => {
    this.setState({verificationCode: event.target.value});
  };

  handleChangePassword = event => {
    this.setState({password: event.target.value});
  };

  handleVerifyClick = () => {
    this.props.onResetPhone({
      security: {
        token: this.state.verificationCode,
      },
      password: this.state.password,
    });
  };

  handleDismiss = () => {
    this.props.history.push('/user/profile');
  };

  render() {
    const codeReadyToResend = this.state.secondsLeftToResend < 1;

    return (
      <Modal flexibleHeight size="SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="pa3 bg-white">
          <h1 className="flex mb3 items-center f-regular">
            Reset Two-Factor Authentication
          </h1>
          <div className="cf">
            <img className="fl w-25" alt="Phone" src={PhoneIcon} />
            <div className="fl w-75">
              <span className="f6 gray-400">
                Let&apos;s make sure this is really you. We just sent a
                verification code to your mobile device. Once you receive it,
                please enter the code below:
              </span>
              <div className="mb2 mt3">
                <Input
                  border
                  type="password"
                  placeholder="Account Password"
                  value={this.state.password}
                  onChange={this.handleChangePassword}
                />
              </div>
              <div className="mv2">
                <Input
                  border
                  placeholder="Enter Code"
                  value={this.state.verificationCode}
                  onChange={this.handleChangeVerificationCode}
                />
              </div>
              {this.props.requestVerificationCodeStatus === 'pending' ? (
                <Status status={this.props.requestVerificationCodeStatus} />
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
              <Link
                className="mt2 f6 tint pointer"
                to="/user/profile/enter-backup-security-code"
              >
                I don&apos;t have access to my device
              </Link>
            </div>
          </div>
          <div className="flex mt3 justify-end">
            {this.props.resetPhoneStatus === 'pending' ? (
              <Status status={this.props.resetPhoneStatus} />
            ) : (
              <Button
                small
                backgroundColorSet
                className="bg-brand"
                disabled={
                  this.state.verificationCode.length < 4 ||
                  this.state.password.length === 0
                }
                onClick={this.handleVerifyClick}
              >
                Continue
              </Button>
            )}
          </div>
        </div>
        <style jsx>{`
          img {
            height: 5rem;
          }
        `}</style>
      </Modal>
    );
  }
}

const enhance = connect(
  state => ({
    requestVerificationCodeStatus:
      state.async.statuses[REQUEST_VERIFICATION_CODE],
    resetPhoneStatus: state.async.statuses[RESET_PHONE],
  }),
  dispatch => ({
    onRequestVerificationCode: () => dispatch(requestVerificationCode()),
    onResetPhone: payload => dispatch(resetPhone(payload)),
  })
);

const EnhancedResetPhonePage = enhance(ResetPhonePage);

export default EnhancedResetPhonePage;
