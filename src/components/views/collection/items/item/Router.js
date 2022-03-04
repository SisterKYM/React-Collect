import {Route, Switch} from 'react-router-dom';
import React from 'react';

import ItemDeletePage from './ItemDeletePage';
import ItemReportPage from './ItemReportPage';

const ItemRouter = () => (
  <Switch>
    <Route
      path="/collection/:owner/:collection/items/item/:item/delete"
      component={ItemDeletePage}
    />
    <Route
      path={[
        '/collection/:owner/:collection/items/item/:item/report',
        '/collection/:owner/:collection/items/item/:item',
      ]}
      component={ItemReportPage}
    />
  </Switch>
);

const EnhancedItemRouter = React.memo(ItemRouter);

export default EnhancedItemRouter;
