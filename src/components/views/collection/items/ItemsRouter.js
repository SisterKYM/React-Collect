import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import CatalogItemsPage from './CatalogItemsPage';
import CategoryDeletePage from './CategoryDeletePage';
import CategoryFormPage from './CategoryFormPage';
import ItemCatalogsPage from './ItemCatalogsPage';
import ItemFormPage from './ItemFormPage';
import ItemMultipleImagesUpgradePage from './ItemMultipleImagesUpgradePage';
import ItemRouter from './item';
import ItemsAdjustPricingPage from './ItemsAdjustPricingPage';
import ItemsDisplayOptionsPage from './ItemsDisplayOptionsPage';
import ItemsPage from './ItemsPage';
import UploadItemsPage from './UploadItemsPage';

const PoseContainer = posed.div();

const ItemsRouter = ({location}) => (
  <>
    <Route path="/collection/:owner/:collection/items" component={ItemsPage} />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/collection/:owner/:collection/items/display-options"
            component={ItemsDisplayOptionsPage}
          />
          <Route
            path="/collection/:owner/:collection/items/adjust-pricing"
            component={ItemsAdjustPricingPage}
          />
          <Route
            path="/collection/:owner/:collection/items/category/:category/delete"
            component={CategoryDeletePage}
          />
          <Route
            path="/collection/:owner/:collection/items/category/:category?"
            component={CategoryFormPage}
          />
          <Route
            path="/collection/:owner/:collection/items/upload-items"
            component={UploadItemsPage}
          />
          <Route
            path={[
              '/collection/:owner/:collection/items/add-item',
              '/collection/:owner/:collection/items/item/:item/edit',
            ]}
            component={ItemFormPage}
          />
          <Route
            exact
            path="/collection/:owner/:collection/items/seller/:seller/catalogs"
            component={ItemCatalogsPage}
          />
          <Route
            path={[
              '/collection/:owner/:collection/items/seller/:seller/catalogs/catalog/:catalog',
              '/collection/:owner/:collection/items/seller/:seller/catalogs/catalog/:catalog/items',
            ]}
            component={CatalogItemsPage}
          />
          <Route
            path="/collection/:owner/:collection/items/:item"
            component={ItemRouter}
          />
        </Switch>
        <Route
          path={[
            '/collection/:owner/:collection/items/add-item/i/item-multiple-images-upgrade',
            '/collection/:owner/:collection/items/item/:item/edit/i/item-multiple-images-upgrade',
          ]}
          component={ItemMultipleImagesUpgradePage}
        />
      </PoseContainer>
    </PoseGroup>
  </>
);

export default ItemsRouter;
