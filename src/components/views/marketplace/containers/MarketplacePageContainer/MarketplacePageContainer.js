import {useSelector} from 'react-redux';
import React from 'react';
import queryString from 'query-string';

import MarketplaceNavigationBarContainer from './MarketplaceNavigationBarContainer';
import MarketplaceTabBarContainer from './MarketplaceTabBarContainer';

const MarketplacePageContainer = ({history, location, subheader, children}) => {
  const organizationData = useSelector(
    (state) => state.session.organization_data
  );

  const initialSearchBy = React.useMemo(
    () => queryString.parse(location.search).searchBy,
    [location.search]
  );

  React.useEffect(() => {
    if (!organizationData || !organizationData.internalMarketplace.enabled) {
      history.push('/collections');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationData]);

  const handleSearch = React.useCallback(
    ({searchBy, term}) => {
      history.push({
        pathname:
          searchBy === 'item'
            ? '/marketplace/shop-items'
            : '/marketplace/sales',
        search: queryString.stringify({
          searchBy,
          searchKeyword: term,
        }),
      });
    },
    [history]
  );

  return (
    <div className="flex flex-column min-vh-100 h-100 bg-gray-200">
      <MarketplaceNavigationBarContainer />
      <div className="sticky top-0 z-2">
        <MarketplaceTabBarContainer
          className="bb-l b--gray-300"
          initialSearchBy={initialSearchBy}
          activePath={location.pathname}
          onSearch={handleSearch}
        />
        {subheader}
      </div>
      {children}
    </div>
  );
};

const EnhancedMarketplacePageContainer = React.memo(MarketplacePageContainer);

export default EnhancedMarketplacePageContainer;
