import React from 'react';

import {MarketplaceMySalesContainer} from './containers';
import {MarketplacePageContainer} from '../containers';
import {MarketplacePageContentContainer} from '../components';

const MarketplaceMySalesPage = ({history, location}) => (
  <MarketplacePageContainer location={location} history={history}>
    <MarketplacePageContentContainer>
      <MarketplaceMySalesContainer />
    </MarketplacePageContentContainer>
  </MarketplacePageContainer>
);

const EnhancedMarketplaceMySalesPage = React.memo(MarketplaceMySalesPage);

export default EnhancedMarketplaceMySalesPage;
