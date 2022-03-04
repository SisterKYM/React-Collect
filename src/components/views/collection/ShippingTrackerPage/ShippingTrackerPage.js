import {compose} from 'recompose';
import {useSelector} from 'react-redux';
import React from 'react';

import {CollectionManageSidebar} from 'elements';
import {DashboardLayout} from 'layout';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {PrimaryNavLinksContainer, WithdrawButtonContainer} from 'containers';
import {getCollection} from 'redux/modules/collections/actions';
import asyncConnect from 'helpers/asyncConnect';

import {ShippablePaymentListContainer} from './containers';

const ShippingTrackerPage = ({match}) => {
  const collection = useSelector(state => state.collections.collection);

  return (
    <DashboardLayout
      primaryNavbar={{
        leftComponent: <PrimaryNavLinksContainer />,
        centerComponent: <WithdrawButtonContainer />,
      }}
      primarySidebar={{
        collection,
        nav: <CollectionManageSidebar collection={collection} />,
      }}
      secondaryNavbar={{collection}}
    >
      <div className="content-container pa4">
        <h1 className="mb3">Shipping Tracker</h1>
        <ShippablePaymentListContainer collectionId={match.params.collection} />
      </div>
    </DashboardLayout>
  );
};

const enhance = compose(
  asyncConnect(props => {
    const state = props.store.getState();
    const stateCollectionId = state.collections.collection
      ? state.collections.collection.id
      : null;

    return String(stateCollectionId) !== String(props.match.params)
      ? [
          {
            key: GET_COLLECTION,
            promise: getCollection,
            payload: {
              collection: props.match.params.collection,
            },
          },
        ]
      : [];
  }),
  React.memo
);

const EnhancedShippingTrackerPage = enhance(ShippingTrackerPage);

export default EnhancedShippingTrackerPage;
