import {connect} from 'react-redux';
import {get} from 'lodash';
import React from 'react';
import cx from 'classnames';

import {Button, Input, Modal, ModalCloseButton, Status} from 'elements';
import {requestVerificationCode} from 'redux/modules/session/actions';
import PhoneIcon from 'theme/images/Phone.svg';

const RESEND_SECONDS_INTERVAL = 45;

class VerifyPhonePage extends React.PureComponent {
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
      prevProps.requestStatusCode === 'pending' &&
      this.props.requestStatusCode === 'success'
    ) {
      this.handleDismiss();
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

  handleVerify = () => {
    this.props.onVerify({
      ...this.props.location.state.payload,
      security: {
        token: this.state.verificationCode,
      },
    });

    this.setState({verificationCode: ''});
  };

  handleDismiss = () => {
    const prevPath = this.props.location.pathname.split('/phone/')[0];

    this.props.history.push(prevPath);
  };

  render() {
    const {requestVerificationCodeStatus, requestStatusCode} = this.props;
    const codeReadyToResend = this.state.secondsLeftToResend < 1;

    return (
      <Modal flexibleHeight size="SMALL" onDismiss={this.handleDismiss}>
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
              {requestVerificationCodeStatus === 'pending' ? (
                <Status status={requestVerificationCodeStatus} />
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
            {requestStatusCode === 'pending' ? (
              <Status status={requestStatusCode} />
            ) : (
              <Button
                backgroundColorSet
                className="bg-brand"
                disabled={this.state.verificationCode.length < 4}
                onClick={this.handleVerify}
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
  (state, props) => ({
    requestStatusCode:
      state.async.statuses[get(props, 'location.state.verifyActionType')],
  }),
  (dispatch, props) => ({
    onRequestVerificationCode: () => dispatch(requestVerificationCode()),
    onVerify: payload =>
      dispatch({
        payload,
        type: get(props, 'location.state.verifyActionType'),
      }),
  })
);

const EnhancedVerifyPhonePage = enhance(VerifyPhonePage);

export default EnhancedVerifyPhonePage;
