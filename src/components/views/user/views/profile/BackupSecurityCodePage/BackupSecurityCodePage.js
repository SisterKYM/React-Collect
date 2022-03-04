import {connect} from 'react-redux';
import {get} from 'lodash';
import CopyToClipboard from 'react-copy-to-clipboard';
import React from 'react';

import {Button, Checkbox, Input, Modal, ModalCloseButton} from 'elements';
import {clearBackupSecurityCode} from 'redux/modules/session/actions';
import {colors} from 'theme/constants';

class BackupSecurityCodePage extends React.Component {
  state = {
    isCodeSaved: false,
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.handleBeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeunload);

    this.props.onClearBackupSecurityCode();
  }

  handleBeforeunload = event => {
    const promptText = 'Are you sure you want to close this browser window?';
    event.returnValue = promptText;

    return promptText;
  };

  handleDismiss = () => {
    if (this.state.isCodeSaved) {
      this.props.history.push('/user/profile');
    }
  };

  handleContinue = () => {
    this.props.history.push('/user/profile');
  };

  handleToggleCodeSaved = () => {
    this.setState(prevState => ({
      isCodeSaved: !prevState.isCodeSaved,
    }));
  };

  render() {
    return (
      <Modal flexibleHeight size="SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className=" pa3 bg-white">
          <h1 className="flex mb3 items-center f-regular">
            Your Backup Security Code
          </h1>
          <div className="mr2">
            <span className="f6 gray-400">
              <b>IMPORTANT:</b> This is your back-up security code. It`&apos;s
              very important that you copy and save this code for future use.
              This code will be your only back up for two-factor authentication.
              If you are unable to access your phone, this code will be the ONLY
              way to recover your account.
            </span>
            <div className="flex mv2 items-center">
              <Input
                readOnly
                border
                className="flex-auto mr2"
                style={{color: colors.darkerGray}}
                value={this.props.backupSecurityCode}
              />
              <CopyToClipboard text={this.props.backupSecurityCode}>
                <Button>Copy</Button>
              </CopyToClipboard>
            </div>
            <div className="mv3">
              <Checkbox
                checkedOnValue
                label="I have copied and saved this code."
                input={{value: this.state.isCodeSaved}}
                onChange={this.handleToggleCodeSaved}
              />
            </div>
          </div>
          <div className="flex mt2 justify-end">
            <Button
              small
              backgroundColorSet
              className="bg-brand"
              disabled={!this.state.isCodeSaved}
              onClick={this.handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const enhance = connect(
  state => ({
    backupSecurityCode: get(state.session, 'backupSecurityCode', ''),
  }),
  dispatch => ({
    onClearBackupSecurityCode: () => dispatch(clearBackupSecurityCode()),
  })
);

const EnhancedBackupSecurityCodePage = enhance(BackupSecurityCodePage);

export default EnhancedBackupSecurityCodePage;
