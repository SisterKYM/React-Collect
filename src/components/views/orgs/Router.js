import {Route, Switch} from 'react-router-dom';
import React from 'react';

import NotFoundPage from 'views/NotFoundPage';

import OrgSignUpPage from './OrgSignUpPage';

const OrgsRouter = () => (
  <Switch>
    <Route exact path="/orgs/:org/signup" component={OrgSignUpPage} />
    <Route
      exact
      path="/orgs/:org/signup/:path*/i/*"
      component={OrgSignUpPage}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

const EnhancedOrgsRouter = React.memo(OrgsRouter);

export default EnhancedOrgsRouter;
