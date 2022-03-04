import {Route, Switch} from 'react-router-dom';
import React from 'react';

import NotFoundPage from 'views/NotFoundPage';

import LogoutPage from './LogoutPage';

const LogoutRouter = () => (
  <Switch>
    <Route exact path="/logout" component={LogoutPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

const EnhancedLogoutRouter = React.memo(LogoutRouter);

export default EnhancedLogoutRouter;
