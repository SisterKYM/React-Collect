import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import {Dropdown} from 'elements';

const SORT_BY_MAP = {
  NEWEST: {
    sort: 'created_at',
    direction: 'desc',
    title: 'Newest',
  },
  ITEM_NAME: {
    sort: 'name',
    direction: 'asc',
    title: 'Item Name',
  },
  PRICE_ASC: {
    sort: 'amount',
    direction: 'asc',
    title: 'Price: Low to High',
  },
  PRICE_DESC: {
    sort: 'amount',
    direction: 'desc',
    title: 'Price: High to Low',
  },
};

const MarketplaceShopItemsFilterBar = ({
  sortBy,
  filtersCount,
  onChangeSortBy,
  onClickFilters,
}) => {
  const [sortByDropdownVisible, setSortByDropdownVisible] = React.useState(
    false
  );

  const title = React.useMemo(() => _.find(SORT_BY_MAP, sortBy).title, [
    sortBy,
  ]);

  const handleClickSortByTitle = React.useCallback(() => {
    setSortByDropdownVisible(true);
  }, []);

  const handleDismissSortByDropdown = React.useCallback(() => {
    setSortByDropdownVisible(false);
  }, []);

  return (
    <div className="flex pa3 items-center bg-white bt bb b--gray-300">
      <div
        className="title ph4 pv2 mr3 avenir-medium ba b--gray-300 pointer"
        onClick={onClickFilters}
      >
        Filters {filtersCount !== 0 && `(${filtersCount})`}
      </div>
      <div className="flex items-center">
        <span className="mr3 f6 avenir-light gray-400">Sort By</span>{' '}
        <Dropdown
          open={sortByDropdownVisible}
          body={
            <div className="pa3">
              {Object.keys(SORT_BY_MAP).map((key, idx) => {
                const value = SORT_BY_MAP[key];

                const handleClick = () => {
                  onChangeSortBy({
                    sort: value.sort,
                    direction: value.direction,
                  });
                  setSortByDropdownVisible(false);
                };

                return (
                  <div
                    key={key}
                    className={cx(
                      'title avenir-medium pointer',
                      idx !== 0 && 'mt3'
                    )}
                    onClick={handleClick}
                  >
                    {SORT_BY_MAP[key].title}
                  </div>
                );
              })}
            </div>
          }
          onDismiss={handleDismissSortByDropdown}
        >
          <div
            className="title ph3 pv2 avenir-medium ba b--gray-300 pointer"
            onClick={handleClickSortByTitle}
          >
            {title}
          </div>
        </Dropdown>
      </div>
      <style jsx>{`
        .title {
          font-size: 0.8125rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedMarketplaceShopItemsFilterBar = React.memo(
  MarketplaceShopItemsFilterBar
);

export default EnhancedMarketplaceShopItemsFilterBar;
