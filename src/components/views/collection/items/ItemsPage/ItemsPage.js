import {useInvalidator, useResource} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import {BottomBarWithButton} from 'elements';
import {CollectionBuilderLayout} from 'layout';
import {collectionsPathHelper} from 'helpers';
import {SecondarySidebarMobile} from 'layout/components';
import CollectionResource from 'resources/CollectionResource';
import ItemCatalogResource from 'resources/ItemCatalogResource';
import ItemResource from 'resources/ItemResource';

import {ItemsContainer} from './containers';
import {ItemsNav, NoItemsConfirmOverlay} from './components';

const ItemsPage = ({history, location, match}) => {
  const collectionId = Number(match.params.collection);
  const [collection, items, itemCatalogs] = useResource(
    [CollectionResource.detailShape(), {id: collectionId}],
    [ItemResource.listShape(), {collectionId}],
    [ItemCatalogResource.listShape(), {}]
  );
  const invalidateCollectionDetail = useInvalidator(
    CollectionResource.detailShape()
  );

  React.useEffect(
    () => () => {
      // collection's is_pro and is_team may be updated
      // TODO: reset all collections state in UpgradePlanContainer
      // when this lands https://github.com/coinbase/rest-hooks/issues/145
      invalidateCollectionDetail({id: collectionId});
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [collectionId, location.pathname]
  );

  const [noItemsConfirmVisible, setNoItemsConfirmVisible] = React.useState(
    false
  );

  const itemCatalogSellers = _.uniqBy(
    itemCatalogs.map(({user}) => user),
    'id'
  );

  const itemsNavElement = (
    <ItemsNav
      className="h-100 bg-gray-200 bg-light-tint-l"
      collection={collection}
      itemsEmpty={items.length === 0}
      itemCatalogSellers={itemCatalogSellers}
    />
  );

  return (
    <>
      <CollectionBuilderLayout
        collection={collection}
        footer={
          <BottomBarWithButton
            className="shadow-4"
            buttonTitle="Save"
            onButtonClick={() => {
              if (items.length === 0) {
                setNoItemsConfirmVisible(true);
              } else {
                const formsPath = collectionsPathHelper(collection, 'forms');
                history.push(formsPath);
              }
            }}
          />
        }
      >
        <div className="relative flex h-100">
          <div className="dn db-l">{itemsNavElement}</div>
          <SecondarySidebarMobile
            className="db dn-l"
            contentContainerClassName="absolute top-0 left-0 h-100 bg-gray-200"
          >
            {itemsNavElement}
          </SecondarySidebarMobile>
          <ItemsContainer
            className="flex-auto content-container"
            collection={collection}
            itemCatalogSellers={itemCatalogSellers}
            items={items}
            collectionId={collectionId}
          />
        </div>
      </CollectionBuilderLayout>
      <NoItemsConfirmOverlay
        history={history}
        visible={noItemsConfirmVisible}
        collection={collection}
        onDismiss={() => {
          setNoItemsConfirmVisible(false);
        }}
      />
    </>
  );
};

const EnhancedItemsPage = React.memo(ItemsPage);

export default EnhancedItemsPage;
