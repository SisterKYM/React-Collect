import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import {some} from 'lodash';
import {useResource} from 'rest-hooks';
import React from 'react';

import {BottomBarWithButton} from 'elements';
import {CollectionBuilderLayout} from 'layout';
import {PageTitle, SecondarySidebarMobile} from 'layout/components';
import {collectionsPathHelper} from 'helpers';
import CollectionResource from 'resources/CollectionResource';
import ItemResource from 'resources/ItemResource';
import CollectionSettingsPayment from './CollectionSettingsPayment';
import CollectionSettingsAccessTiming from './CollectionSettingsAccessTiming';
import SettingsNavTabs from './SettingsNavTabs';
import CollectionSettingsShippingDiscounts from './CollectionSettingsShippingDiscounts';
import CollectionSettingsManagersAndContact from './CollectionSettingsManagersAndContact';

const CollectionSettings = ({history, match, location, children}) => {
  const {url} = useRouteMatch();

  const [collection, items] = useResource(
    [CollectionResource.detailShape(), {id: Number(match.params.collection)}],
    [ItemResource.listShape(), {collectionId: Number(match.params.collection)}]
  );

  const collectionHasRecurringItems = some(items, {
    options: {recurring: {enabled: true}},
  });

  const handleSave = React.useCallback(() => {
    history.push(collectionsPathHelper(collection, 'share'));
  }, [collection, history]);

  return (
    <CollectionBuilderLayout
      collection={collection}
      footer={
        <BottomBarWithButton
          className="shadow-4"
          buttonTitle="Continue"
          onButtonClick={handleSave}
        />
      }
    >
      <div className="relative flex h-100">
        <SecondarySidebarMobile
          className="db dn-l"
          contentContainerClassName="absolute top-0 left-0 h-100 bg-gray-200"
        >
          <SettingsNavTabs
            currentPathname={location.pathname}
            collection={collection}
          />
        </SecondarySidebarMobile>
        <div className="content-container pt3 ph3 pb5">
          <PageTitle className="dark-grey avenir-roman">Settings</PageTitle>
          <div className="dn db-l">
            <SettingsNavTabs
              currentPathname={location.pathname}
              collection={collection}
            />
          </div>
          <Switch>
            <Route exact path={`${url}/payments`}>
              <CollectionSettingsPayment
                collection={collection}
                items={items}
                collectionHasRecurringItems={collectionHasRecurringItems}
              />
            </Route>
            <Route path={`${url}/shipping-and-discounts`}>
              <CollectionSettingsShippingDiscounts
                collection={collection}
                collectionHasRecurringItems={collectionHasRecurringItems}
              />
            </Route>
            <Route path={`${url}/access-and-timing`}>
              <CollectionSettingsAccessTiming
                collection={collection}
                items={items}
                match={match}
                collectionHasRecurringItems={collectionHasRecurringItems}
              />
            </Route>
            <Route path={`${url}/managers`}>
              <CollectionSettingsManagersAndContact collection={collection} />
            </Route>
            <Redirect exact from={url} to={`${url}/payments`} />
          </Switch>
          {children}
        </div>
      </div>
    </CollectionBuilderLayout>
  );
};

export default CollectionSettings;
