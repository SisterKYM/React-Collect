import {Route, Switch} from 'react-router-dom';
import React from 'react';

import AuthHocs from 'helpers/AuthHocs';
import CollectionRouter from 'views/i/collection/Router';
import OrgsRouter from 'views/i/orgs/Router';
import config from 'config';

import PlansRouter from './plans';

const WithAuthCollectionRouter = AuthHocs.requireAuthenticated(
  CollectionRouter
);

const IRouter = () => (
  <Switch>
    {config.enabledFeatures.subscriptions && (
      <Route path="*/i/plans" component={PlansRouter} />
    )}
    <Route path="*/i/collection" component={WithAuthCollectionRouter} />
    <Route path="*/i/orgs" component={OrgsRouter} />
  </Switch>
);

export default IRouter;
