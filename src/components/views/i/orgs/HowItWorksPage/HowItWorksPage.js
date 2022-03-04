import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';
import config from 'config';

import {Button, Modal, ModalCloseButton} from 'elements';
import {ORG_HOW_IT_WORKS_VIDEO_URL_DEFAULT, ORGS} from 'data/orgs';

class HowItWorksPage extends React.PureComponent {
  handleDismiss = () => {
    this.props.history.push(this.props.location.pathname.split('/i/')[0]);
  };

  render() {
    const {org} = this.props.match.params;

    return (
      <Modal flexibleHeight size="MEDIUM" onDismiss={this.handleDismiss}>
        <ModalCloseButton onClick={this.handleDismiss} />
        <div className="pa4">
          <h1 className="mt2 mh2">Welcome to {config.strings.name}</h1>
          <div
            className="iframe-wrapper relative mt2"
            style={{
              paddingBottom: this.props.greaterThanMedium ? 500 : '56.25%',
            }}
          >
            <iframe
              title="Video"
              className="absolute top-0 left-0 w-100 h-100 bn"
              src={this.props.videoUrl}
            />
          </div>
          <p className="mt3">
            {this.props.videoUrl === ORG_HOW_IT_WORKS_VIDEO_URL_DEFAULT
              ? 'Cheddar Up will help you move your community online in minutes and save you time. Get started by investing three minutes to learn how Cheddar Up works.'
              : 'As one of our partners, you have access to custom tools that will make creating a collection even easier. This three-minute video will show you how to get started with these tools.'}
          </p>
          <div className="flex mt3 justify-end">
            <Link
              to={
                this.props.userId
                  ? `/collection/${this.props.userId}/details`
                  : `/orgs/${org}/signup`
              }
            >
              <Button backgroundColorSet className="bg-brand">
                Create
              </Button>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .iframe-wrapper {
            height: 0px;
          }
        `}</style>
      </Modal>
    );
  }
}

const enhance = connect((state, props) => ({
  greaterThanMedium: state.browser.greaterThan.medium,
  userId: state.session && state.session.user && state.session.user.id,
  videoUrl:
    (state.session && state.session.howItWorksVideoUrl) ||
    (ORGS[props.match.params.org] &&
      ORGS[props.match.params.org].howItWorksVideoUrl),
}));

const EnhancedHowItWorksPage = enhance(HowItWorksPage);

export default EnhancedHowItWorksPage;
