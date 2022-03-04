import React from 'react';
import queryString from 'query-string';

import {MarketplacePageContainer} from '../containers';
import {MarketplacePageContentContainer} from '../components';
import {MarketplaceSalesContainer} from './containers';

const SORT_BY = {
  sort: 'last_name',
  direction: 'desc',
};

const MarketplaceSalesPage = ({history, location}) => {
  const searchKeyword = React.useMemo(
    () => queryString.parse(location.search).searchKeyword,
    [location.search]
  );

  return (
    <MarketplacePageContainer location={location} history={history}>
      <MarketplacePageContentContainer>
        <MarketplaceSalesContainer
          searchKeyword={searchKeyword}
          sortBy={SORT_BY}
        />
      </MarketplacePageContentContainer>
    </MarketplacePageContainer>
  );
};

const EnhancedMarketplaceSalesPage = React.memo(MarketplaceSalesPage);

export default EnhancedMarketplaceSalesPage;
