import {Route, Switch} from 'react-router-dom';
import React from 'react';

import SimpleClubSignUpRouter from 'views/signup/simple_club/Router';
import SimplePtaSignUpRouter from 'views/signup/simple_pta/Router';

import SignUpPage from './SignUpPage';

const SignUpRouter = () => (
  <Switch>
    <Route exact path="/signup/simple_pta" component={SimplePtaSignUpRouter} />
    <Route
      exact
      path="/signup/simple_club"
      component={SimpleClubSignUpRouter}
    />
    <Route path="/signup" component={SignUpPage} />
  </Switch>
);

const EnhancedSignUpRouter = React.memo(SignUpRouter);

export default EnhancedSignUpRouter;
