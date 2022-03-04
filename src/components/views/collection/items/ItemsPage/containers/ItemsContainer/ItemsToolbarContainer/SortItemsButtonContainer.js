import {useFetcher} from 'rest-hooks';
import React from 'react';

import {ReactComponent as SortAlphabeticIcon} from 'theme/images/sort-alphabetic.svg';
import ItemResource from 'resources/ItemResource';

import {ItemsToolbarButton} from './components';

const SortItemsButtonContainer = ({className, collectionId}) => {
  const alphabetizeItems = useFetcher(ItemResource.alphabetizeListShape());

  const [loading, setLoading] = React.useState(false);

  const handleSort = async () => {
    try {
      setLoading(true);

      await alphabetizeItems({collectionId});
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemsToolbarButton
      className={className}
      loading={loading}
      onClick={handleSort}
    >
      <SortAlphabeticIcon className="dib w1 v-mid" />{' '}
      <span className="dn di-ns ml2 mb1 v-mid">Sort</span>
    </ItemsToolbarButton>
  );
};

const EnhancedSortItemsButtonContainer = React.memo(SortItemsButtonContainer);

export default EnhancedSortItemsButtonContainer;
