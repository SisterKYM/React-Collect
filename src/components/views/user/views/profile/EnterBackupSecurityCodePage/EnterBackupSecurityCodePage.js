import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

import {Button, Input, Modal, ModalCloseButton, Status} from 'elements';
import {RESET_PHONE} from 'redux/modules/session/constants';
import {resetPhone} from 'redux/modules/session/actions';

class EnterBackupSecurityCodePage extends React.Component {
  state = {
    backupSecurityCode: '',
    password: '',
  };

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

  handleDismiss = () => {
    this.props.history.push('/user/profile');
  };

  handleResetPhone = () => {
    this.props.onResetPhone({
      reset_code: this.state.backupSecurityCode,
      password: this.state.password,
    });
  };

  handleChangeBackupSecurityCode = event => {
    this.setState({backupSecurityCode: event.target.value});
  };

  handleChangePassword = event => {
    this.setState({password: event.target.value});
  };

  render() {
    return (
      <Modal flexibleHeight size="EXTRA_SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="pa3 bg-white">
          <h1 className="flex mb3 items-center tc f-regular">
            Enter Your Backup Security Code
          </h1>
          <div className="mr2">
            <span className="f6 gray-400">
              If you do not have access to your device used for two-factor
              authentication, you can reset it using your back-up security code.
              You should have received and saved your back-up security code when
              originally setting up two-factor authentication.
            </span>
            <div className="mv2">
              <Input
                border
                className="flex-auto"
                borderRadius={false}
                placeholder="________-____-____-____-____________"
                value={this.state.backupSecurityCode}
                onChange={this.handleChangeBackupSecurityCode}
              />
            </div>
            <div className="mv2">
              <Input
                border
                borderRadius={false}
                type="password"
                placeholder="Account Password"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </div>
          </div>
          <div className="flex mt3 justify-end">
            <Link className="mr2" to="/user/profile/reset-phone">
              <Button small backgroundColorSet className="bg-gray-400">
                Back
              </Button>
            </Link>
            {this.props.resetPhoneStatus === 'pending' ? (
              <Status status={this.props.resetPhoneStatus} />
            ) : (
              <Button
                small
                backgroundColorSet
                className="bg-brand"
                disabled={
                  this.state.backupSecurityCode.length === 0 ||
                  this.state.password.length === 0
                }
                onClick={this.handleResetPhone}
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
    resetPhoneStatus: state.async.statuses[RESET_PHONE],
  }),
  dispatch => ({
    onResetPhone: payload => dispatch(resetPhone(payload)),
  })
);

const EnhancedEnterBackupSecurityCodePage = enhance(
  EnterBackupSecurityCodePage
);

export default EnhancedEnterBackupSecurityCodePage;
