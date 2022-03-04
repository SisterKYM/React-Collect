import {Route, Switch} from 'react-router-dom';
import React from 'react';

import ImageAlbumPage from './ImageAlbumPage';
import ImageCropPage from './ImageCropPage';
import ImageUploadPage from './ImageUploadPage';

const Router = () => (
  <Switch>
    <Route
      exact
      path={[
        '/media/:owner/:collection?/images/albums/:album?',
        '/media/:owner/:collection?/images',
      ]}
      component={ImageAlbumPage}
    />
    <Route
      exact
      path="/media/:owner/:collection?/images/upload"
      component={ImageUploadPage}
    />
    <Route
      exact
      path="/media/:owner/:collection?/images/upload/crop"
      component={ImageCropPage}
    />
  </Switch>
);

export default Router;
