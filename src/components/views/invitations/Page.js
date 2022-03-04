import {compose, setDisplayName, mapProps, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import React, {PureComponent} from 'react';

import {VerificationPrompt} from 'elements';
import {Layout} from 'layout';

import {ACTIONS, HANDLERS} from './config';
import {mapProps as propsMapper, mapStore} from './lib';
import config from '../../../config';

class Page extends PureComponent {
  componentDidUpdate(prevProps) {
    if (
      this.props.acceptStatus !== prevProps.status &&
      this.props.acceptStatus === 'success'
    ) {
      this.props.history.push('/collections');
    }
  }

  render() {
    const {
      onAccept,
      onDismiss,
      acceptIsPending,
      acceptStatus,
      organizerName,
    } = this.props;

    return (
      <Layout>
        <VerificationPrompt
          flexibleHeight
          onDismiss={onDismiss}
          title="Manager Access"
          description={`${organizerName} has invited you to help manage their ${config.strings.collection}s.`}
          okButtonLabel="Accept Invitation"
          onOkButtonClick={onAccept}
          okButtonDisabled={acceptIsPending}
          cancelButtonLabel="Decline"
          onCancelButtonClick={onDismiss}
          cancelButtonDisabled={acceptIsPending}
          status={acceptStatus}
        />
      </Layout>
    );
  }
}

const enhance = compose(
  setDisplayName('views/invitations/Page'),
  connect(mapStore, ACTIONS),
  withHandlers(HANDLERS),
  mapProps(propsMapper)
);

const EnhancedPage = enhance(Page);

export default EnhancedPage;
