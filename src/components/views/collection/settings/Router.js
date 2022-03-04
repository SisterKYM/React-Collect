import React from 'react';
import {Route} from 'react-router-dom';
import CollectionSettingsPage from './CollectionSettingsPage';

const Router = () => (
  <Route
    path="/collection/:owner/:collection/settings"
    component={CollectionSettingsPage}
  />
);

export default Router;
