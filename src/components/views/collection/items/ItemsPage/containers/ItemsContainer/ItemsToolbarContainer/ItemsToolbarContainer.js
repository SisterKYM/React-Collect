import React from 'react';
import cx from 'classnames';

import config from 'config';

import {ItemsToolbarSearchBar} from './components';
import AdjustPricingButtonContainer from './AdjustPricingButtonContainer';
import DisplayOptionsButtonContainer from './DisplayOptionsButtonContainer';
import ItemsReportButtonContainer from './ItemsReportButtonContainer';
import SortItemsButtonContainer from './SortItemsButtonContainer';

const ItemsToolbarContainer = ({className, collection, onSearch}) => {
  const [searchBarErrorMessage, setSearchBarErrorMessage] = React.useState('');

  return (
    <div
      className={cx(
        'cf pa3 bg-white ba b--gray-300 br2-ns shadow-light',
        className
      )}
    >
      <div className="cf fl w-100 w-75-ns">
        <SortItemsButtonContainer
          className="fl ma1"
          collectionId={collection.id}
        />
        <DisplayOptionsButtonContainer
          className="fl ma1"
          ownerId={collection.user_id}
          collectionId={collection.id}
        />
        <ItemsReportButtonContainer
          className="fl ma1"
          collection={collection}
        />
        {config.siteName !== 'PIXIE_LANE' && (
          <AdjustPricingButtonContainer
            className="fl ma1"
            ownerId={collection.user_id}
            collectionId={collection.id}
          />
        )}
      </div>
      <ItemsToolbarSearchBar
        className="fl w-100 w-25-ns mt2 mt0-ns pa1"
        errorMessage={searchBarErrorMessage}
        onResetErrorMessage={() => {
          setSearchBarErrorMessage('');
        }}
        onSubmit={keyword => {
          const foundItem = onSearch(keyword);

          if (!foundItem) {
            setSearchBarErrorMessage('No results found');
          }
        }}
      />
    </div>
  );
};

const EnhancedItemsToolbarContainer = React.memo(ItemsToolbarContainer);

export default EnhancedItemsToolbarContainer;
