import {Route, Switch} from 'react-router-dom';
import React from 'react';

import NotFoundPage from 'views/NotFoundPage';

import ForgotPasswordPage from './ForgotPasswordPage';
import LoginPage from './LoginPage';
import ResetPasswordPage from './ResetPasswordPage';

const LoginRouter = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/login/i/plans" component={LoginPage} />
    <Route exact path="/login/i/plans/pro" component={LoginPage} />
    <Route exact path="/login/forgot-password" component={ForgotPasswordPage} />
    <Route path="/login/forgot-password/reset" component={ResetPasswordPage} />
    <Route
      exact
      path="/login/forgot-password/i/plans"
      component={ForgotPasswordPage}
    />
    <Route
      exact
      path="/login/forgot-password/i/plans/pro"
      component={ForgotPasswordPage}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

const EnhancedLoginRouter = React.memo(LoginRouter);

export default EnhancedLoginRouter;
