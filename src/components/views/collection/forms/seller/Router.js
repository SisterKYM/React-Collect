import {Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';

import {collectionsRouterPathHelper} from 'helpers';

import AddSellerFormPage from './AddSellerFormPage';
import SellerFormsPage from './SellerFormsPage';

const renderSellerFormsRoute = ({match: {params}}) => (
  <Redirect
    to={collectionsRouterPathHelper(
      params,
      `forms/seller/${params.seller}/forms`
    )}
  />
);

export default React.memo(() => (
  <>
    <Route
      exact
      path="/collection/:owner/:collection/forms/seller/:seller"
      render={renderSellerFormsRoute}
    />
    <Switch>
      <Route
        path="/collection/:owner/:collection/forms/seller/:seller/forms/form/:form"
        component={AddSellerFormPage}
      />
      <Route
        path="/collection/:owner/:collection/forms/seller/:seller/forms"
        component={SellerFormsPage}
      />
    </Switch>
  </>
));
