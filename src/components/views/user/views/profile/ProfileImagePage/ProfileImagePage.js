import React from 'react';

import {Modal, ModalCloseButton} from 'elements';

import {ProfileImageFormContainer} from './containers';

class ProfileImagePage extends React.PureComponent {
  handleDismiss = () => {
    this.props.history.push('/user/profile');
  };

  render() {
    return (
      <Modal flexibleHeight size="SMALL" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <ProfileImageFormContainer
          className="pa3"
          onDidSaveProfileImage={this.handleDismiss}
        />
      </Modal>
    );
  }
}

export default ProfileImagePage;
