import {compose, mapProps, withHandlers} from 'recompose';
import React from 'react';

import {SendMessageToMembersContainer} from 'containers';
import {asyncConnect} from 'helpers';

import {connector, onDismiss, propsMapper} from './lib';
import {formName} from './config';

const CollectionManageMessagePage = ({cid, onDismiss}) => (
  <SendMessageToMembersContainer
    collection={cid}
    formName={formName}
    onDismiss={onDismiss}
  />
);

const enhance = compose(
  asyncConnect(connector),
  mapProps(propsMapper),
  withHandlers({onDismiss}),
  React.memo
);

const EnhancedCollectionManageMessagePage = enhance(
  CollectionManageMessagePage
);

export default EnhancedCollectionManageMessagePage;
