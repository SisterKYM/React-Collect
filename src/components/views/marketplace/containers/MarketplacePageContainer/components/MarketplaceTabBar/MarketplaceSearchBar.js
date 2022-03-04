import {FaCaretDown} from 'react-icons/fa';
import React from 'react';
import cx from 'classnames';
import pluralize from 'pluralize';

import {Dropdown, SearchForm} from 'elements';

const MarketplaceSearchBar = ({
  className,
  iconClassName,
  initialSearchBy = 'item',
  border,
  marketplaceName,
  onSubmit,
}) => {
  const [searchBy, setSearchBy] = React.useState(initialSearchBy);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const handleSelectSearchByItem = React.useCallback(() => {
    setSearchBy('item');
    setDropdownVisible(false);
  }, []);

  const handleSelectSearchByMarketplace = React.useCallback(() => {
    setSearchBy('marketplace');
    setDropdownVisible(false);
  }, []);

  const handleClickSearchByTitle = React.useCallback(() => {
    setDropdownVisible(prevDropdownVisible => !prevDropdownVisible);
  }, []);

  const handleDismissDropdown = React.useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const handleSubmit = React.useCallback(
    values => {
      onSubmit({
        ...values,
        searchBy,
      });
    },
    [searchBy, onSubmit]
  );

  const searchByTitle =
    searchBy === 'marketplace' ? pluralize(marketplaceName) : 'Items';

  return (
    <div className={cx('flex h-auto-l', className)}>
      <Dropdown
        className="dropdown mw5 pv2 pv0-l br br--left br-0-l bt-l bl-l bb-l b--gray-300"
        childrenWrapperClassName="h-100 h-auto-l"
        width="auto"
        open={dropdownVisible}
        body={
          <ul className="f6 tc">
            <li
              className="dt w-100 pa2 pointer bb b--gray-300"
              onClick={handleSelectSearchByItem}
            >
              <span className="dtc v-mid">Items</span>
            </li>
            <li
              className="dt w-100 pa2 pointer"
              onClick={handleSelectSearchByMarketplace}
            >
              <span className="dtc v-mid truncate">
                {pluralize(marketplaceName)}
              </span>
            </li>
          </ul>
        }
        onDismiss={handleDismissDropdown}
      >
        <div
          className="flex h-100 ph2 justify-center items-center f6 pointer"
          onClick={handleClickSearchByTitle}
        >
          <span className="pv2 mr1">{searchByTitle}</span>
          <FaCaretDown className="f7 overflow-visible" />
        </div>
      </Dropdown>
      <SearchForm
        enableReinitialize
        className="flex-auto"
        iconClassName={iconClassName}
        inputBorder={border}
        form="MarketplaceNavigationBarSearchForm"
        placeholder={`Search ${searchByTitle}`}
        initialValues={{term: ''}}
        onSubmit={handleSubmit}
      />
      <style jsx>{`
        :global(.dropdown) {
          width: unset !important;
        }
      `}</style>
    </div>
  );
};

const EnhancedMarketplaceSearchBar = React.memo(MarketplaceSearchBar);

export default EnhancedMarketplaceSearchBar;
