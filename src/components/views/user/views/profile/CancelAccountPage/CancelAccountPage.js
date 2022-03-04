import React from 'react';

import {Modal, ModalCloseButton} from 'elements';
import config from 'config';

import {CancelAccountConfirm} from './components';
import {CancelAccountContainer} from './containers';

class CancelAccountPage extends React.PureComponent {
  state = {
    confirmedToDelete: false,
  };

  handleDismiss = () => {
    this.props.history.push('/user/profile');
  };

  handleConfirmDeleteAccount = () => {
    this.setState({confirmedToDelete: true});
  };

  render() {
    return (
      <Modal flexibleHeight size="SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="pa3">
          {this.state.confirmedToDelete ? (
            <CancelAccountContainer onDismiss={this.handleDismiss} />
          ) : (
            <CancelAccountConfirm
              changePartnerAffilationUrl={`mailto:${config.strings.supportEmail}?subject=Cancel Account&body=Hi there! I'd like to cancel my ${config.strings.name} account with the username:`}
              billingPath="/user/billing"
              onKeepAccount={this.handleDismiss}
              onConfirmDeleteAccount={this.handleConfirmDeleteAccount}
            />
          )}
        </div>
      </Modal>
    );
  }
}

export default CancelAccountPage;
