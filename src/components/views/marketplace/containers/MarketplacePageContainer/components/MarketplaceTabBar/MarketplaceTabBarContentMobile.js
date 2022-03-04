import {FaBars, FaChevronLeft, FaSearch} from 'react-icons/fa';
import React from 'react';

import {MarketplaceHeading} from 'elements';

import MarketplaceNavigationMenuMobile from './MarketplaceNavigationMenuMobile';
import MarketplaceSearchBar from './MarketplaceSearchBar';

const MarketplaceTabBarContentMobile = ({
  initialSearchBy,
  navigationLinks,
  profileLinks,
  marketplaceName,
  profileImageElement,
  onSubmitSearchForm,
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [searchBarVisible, setSearchBarVisible] = React.useState(false);

  const handleClickBarsIcon = React.useCallback(() => {
    setMenuVisible(true);
  }, []);

  const handleDismissMenu = React.useCallback(() => {
    setMenuVisible(false);
  }, []);

  const handleClickSearchIcon = React.useCallback(() => {
    setSearchBarVisible(true);
  }, []);

  const handleClickCaretLeftIcon = React.useCallback(() => {
    setSearchBarVisible(false);
  }, []);

  return (
    <>
      <div className="flex dn-l h-100 justify-between items-center">
        {searchBarVisible ? (
          <>
            <FaChevronLeft
              className="chevron-left f4 pointer"
              onClick={handleClickCaretLeftIcon}
            />
            <MarketplaceSearchBar
              className="flex flex-auto items-center bt bb bl b--gray-300"
              iconClassName="search-bar-icon"
              initialSearchBy={initialSearchBy}
              border={false}
              marketplaceName={marketplaceName}
              onSubmit={onSubmitSearchForm}
            />
          </>
        ) : (
          <>
            <FaBars className="ml3 pointer" onClick={handleClickBarsIcon} />
            <MarketplaceHeading
              text={`${marketplaceName} Marketplace`}
              className="dn-l"
            />
            <FaSearch className="mr3 pointer" onClick={handleClickSearchIcon} />
          </>
        )}
      </div>
      {menuVisible && (
        <div className="relative">
          <MarketplaceNavigationMenuMobile
            className="absolute top-0 left-0 w5 z-1"
            navigationLinks={navigationLinks}
            profileLinks={profileLinks}
            profileImageElement={profileImageElement}
            onDismiss={handleDismissMenu}
          />
        </div>
      )}
      <style jsx>{`
        :global(.chevron-left) {
          width: 3rem;
        }
        :global(.search-bar-icon) {
          display: none !important;
        }
      `}</style>
    </>
  );
};

const EnhancedMarketplaceTabBarContentMobile = React.memo(
  MarketplaceTabBarContentMobile
);

export default EnhancedMarketplaceTabBarContentMobile;
