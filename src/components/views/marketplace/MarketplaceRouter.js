import {Route, Switch} from 'react-router-dom';
import React from 'react';

import MarketplaceHomePage from './MarketplaceHomePage';
import MarketplaceMySalesPage from './MarketplaceMySalesPage';
import MarketplaceSalesPage from './MarketplaceSalesPage';
import MarketplaceShopItemsPage from './MarketplaceShopItemsPage';

const MarketplaceRouter = () => (
  <Switch>
    <Route exact path="/marketplace" component={MarketplaceHomePage} />
    <Route
      exact
      path="/marketplace/shop-items"
      component={MarketplaceShopItemsPage}
    />
    <Route exact path="/marketplace/sales" component={MarketplaceSalesPage} />
    <Route
      exact
      path="/marketplace/my-sales"
      component={MarketplaceMySalesPage}
    />
  </Switch>
);

const EnhancedMarketplaceRouter = React.memo(MarketplaceRouter);

export default EnhancedMarketplaceRouter;
