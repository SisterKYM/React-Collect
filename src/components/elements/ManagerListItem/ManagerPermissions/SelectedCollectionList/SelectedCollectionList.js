import {connect} from 'react-redux';
import {flow, fromPairs, map, reject} from 'lodash/fp';
import React from 'react';

import {GET_COLLECTIONS} from 'redux/modules/collections/constants';
import Status from 'elements/Status';

import SelectedCollectionListItem from './SelectedCollectionListItem';

class SelectedCollectionList extends React.PureComponent {
  handleChangeReceiveMessages = collection => {
    const {manager} = this.props;

    this.props.updateManager({
      ...manager,
      manager: manager.id,
      access_scope: {
        ...manager.access_scope,
        collections: {
          ...manager.access_scope.collections,
          specific: {
            ...manager.access_scope.collections.specific,
            [collection.id]: {
              id: collection.id,
              receive_messages: !manager.access_scope.collections.specific[
                collection.id
              ].receive_messages,
            },
          },
        },
      },
    });
  };

  handleRemove = collection => {
    const {manager} = this.props;
    const nextSpecific = flow(
      reject({id: collection.id}),
      map(collection => [collection.id, collection]),
      fromPairs
    )(manager.access_scope.collections.specific);

    this.props.updateManager({
      ...manager,
      manager: manager.id,
      access_scope: {
        ...manager.access_scope,
        collections: {
          ...manager.access_scope.collections,
          specific: nextSpecific,
        },
      },
    });
  };

  renderCollection = (collection, idx) => (
    <div key={collection.id} className={idx !== 0 ? 'mt2' : ''}>
      <SelectedCollectionListItem
        collection={collection}
        receiveNotifications={
          this.props.manager.access_scope.collections.specific[collection.id]
            .receive_messages
        }
        onChangeReceiveMessages={() =>
          this.handleChangeReceiveMessages(collection)
        }
        onRemove={() => this.handleRemove(collection)}
      />
    </div>
  );

  render() {
    const collections = this.props.collections.filter(({id}) =>
      this.props.collectionIds.includes(String(id))
    );

    return (
      <div>
        {this.props.loading ? (
          <div className="flex pv3 justify-center">
            <Status status="pending" />
          </div>
        ) : (
          collections.map(this.renderCollection)
        )}
      </div>
    );
  }
}

const enhance = connect(state => ({
  loading: state.async.statuses[GET_COLLECTIONS] === 'pending',
}));

const EnhancedSelectedCollectionList = enhance(SelectedCollectionList);

export default EnhancedSelectedCollectionList;
