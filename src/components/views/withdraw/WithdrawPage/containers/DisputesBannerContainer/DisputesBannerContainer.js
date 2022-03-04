import React from 'react';
import _ from 'lodash';

import getDisputedCollection from 'helpers/getDisputedCollection';

import {DisputesBanner} from './components';
import {useCollections} from '../../hooks';

const useDisputedCollection = () => {
  const collections = useCollections();

  return React.useMemo(() => getDisputedCollection(collections), [collections]);
};

const useTotalDiputeAmount = () => {
  const disputedCollections = useCollections().filter(
    collection =>
      collection.access.owner && collection.withdrawal_balance_available < 0
  );

  return React.useMemo(() => {
    const disputedCollectionBalances = disputedCollections.map(
      ({withdrawal_balance_available}) => withdrawal_balance_available
    );

    Math.abs(_.sum(disputedCollectionBalances));
  }, [disputedCollections]);
};

const DisputesBannerContainer = () => {
  const totalDisputeAmount = useTotalDiputeAmount();
  const disputedCollection = useDisputedCollection();

  return (
    totalDisputeAmount > 0 &&
    disputedCollection && (
      <DisputesBanner
        disputedCollection={disputedCollection}
        totalDisputeAmount={totalDisputeAmount}
      />
    )
  );
};

const EnhancedDisputesBannerContainer = React.memo(DisputesBannerContainer);

export default EnhancedDisputesBannerContainer;
