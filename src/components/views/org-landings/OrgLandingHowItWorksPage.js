import React from 'react';

import {Modal, ModalCloseButton} from 'elements';

class OrgLandingHowItWorksPage extends React.PureComponent {
  handleDismiss = () => {
    this.props.history.push(
      this.props.location.pathname.split('/how-it-works')[0]
    );
  };

  render() {
    return (
      <Modal flexibleHeight onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="flex flex-column flex-wrap mt2 items-center">
          <iframe
            allowFullScreen
            className="bn"
            title="Video"
            src="https://player.vimeo.com/video/230275990"
          />
        </div>
        <style jsx>{`
          iframe {
            width: 70vw;
            height: 70vh;
          }
        `}</style>
      </Modal>
    );
  }
}

export default OrgLandingHowItWorksPage;
