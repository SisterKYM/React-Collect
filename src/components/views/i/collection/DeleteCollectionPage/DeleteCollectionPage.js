import {capitalize, get, some} from 'lodash';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';
import truncate from 'truncate';

import {VerificationPrompt} from 'elements';
import {
  DELETE_COLLECTION,
  GET_COLLECTION,
} from 'redux/modules/collections/constants';
import {GET_ITEMS} from 'redux/modules/items/constants';
import {asyncConnect} from 'helpers';
import {
  deleteCollection,
  getCollection,
} from 'redux/modules/collections/actions';
import {getItems} from 'redux/modules/items/actions';
import config from 'config';

class DeleteCollectionPage extends React.PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.status !== 'success' && this.props.status === 'success') {
      this.props.history.push('/collections');
    }
  }

  handleSubmit = () => {
    this.props.deleteCollection({
      collection: this.props.match.params.collection,
    });
  };

  handleDismiss = () => {
    this.props.history.push('/collections');
  };

  render() {
    const {collectionHasRecurringItems, loading} = this.props;
    const pending = this.props.status === 'pending';

    return (
      <VerificationPrompt
        flexibleHeight
        onDismiss={this.handleDismiss}
        title={`Delete ${capitalize(
          config.strings.collection
        )}. This can not be undone.`}
        description={
          collectionHasRecurringItems
            ? `Deleting this ${config.strings.collection} will stop all future
            <br />
            scheduled recurring payments on this ${config.strings.collection}.
            <br />
            Would you like to continue?`
            : `You are going to delete ${truncate(
                this.props.collectionName,
                27
              )}.<br />
            This cannot be undone. Are you sure?`
        }
        okButtonLabel={pending ? 'Deleting...' : 'Delete'}
        onOkButtonClick={this.handleSubmit}
        okButtonDisabled={loading || pending}
        cancelButtonLabel="Cancel"
        onCancelButtonClick={this.handleDismiss}
        cancelButtonDisabled={loading || pending}
      />
    );
  }
}

const enhance = compose(
  asyncConnect((props) => {
    const state = props.store.getState();

    return Object.keys(state.async.statuses).length !== 0
      ? [
          {
            key: GET_COLLECTION,
            payload: {collection: props.match.params.collection},
            promise: getCollection,
          },
          {
            key: GET_ITEMS,
            payload: {collection: props.match.params.collection},
            promise: getItems,
          },
        ]
      : [];
  }),
  connect(
    (
      {async: {statuses}, collections: {collection}, items: {items}},
      ownProps
    ) => ({
      collectionName: collection ? collection.name : '',
      collectionHasRecurringItems: some(
        items,
        (item) =>
          String(item.tab_id) === ownProps.match.params.collection &&
          get(item, 'options.recurring.enabled')
      ),
      status: statuses[DELETE_COLLECTION],
      loading:
        statuses[GET_COLLECTION] === 'pending' ||
        statuses[GET_ITEMS] === 'pending',
    }),
    {
      getItems,
      deleteCollection,
    }
  )
);

const EnhancedDeleteCollectionPage = enhance(DeleteCollectionPage);

export default EnhancedDeleteCollectionPage;
