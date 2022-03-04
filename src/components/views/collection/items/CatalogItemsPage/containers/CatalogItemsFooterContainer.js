import {
  generatePath,
  Link,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import {useFetcher, useInvalidator} from 'rest-hooks';
import {useSelector} from 'react-redux';
import React from 'react';

import {StatusContainer, CommonButton} from 'elements';
import CategoryResource from 'resources/CategoryResource';
import ItemResource from 'resources/ItemResource';

const CatalogItemsFooterContainer = ({
  collection,
  collectionItems,
  selectedItems,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const ownerId = Number(match.params.owner);
  const collectionId = Number(match.params.collection);
  const sellerId = Number(match.params.seller);
  const catalogId = Number(match.params.catalog);

  const createItemFromCatalogItem = useFetcher(
    ItemResource.createItemFromCatalogItemShape()
  );
  const invalidateItemList = useInvalidator(ItemResource.listShape());
  const invalidateCategoryList = useInvalidator(CategoryResource.listShape());
  const userIsBasic = !collection?.is_pro;

  const [loading, setLoading] = React.useState(false);

  const handleAddItems = async () => {
    if (selectedItems.length === 0) {
      return;
    }

    if (
      userIsBasic &&
      collectionItems.length + selectedItems.length >
        (collection.itemLimit || 15)
    ) {
      history.push(`${location.pathname}/i/plans/upgrade-required`, {
        selectedItems,
      });
    } else {
      try {
        setLoading(true);

        await createItemFromCatalogItem(
          {collectionId},
          {catalog: {id: catalogId, items: selectedItems}}
        );

        invalidateCategoryList({collectionId});
        invalidateItemList({collectionId});

        const path = generatePath('/collection/:owner/:collection/items', {
          owner: ownerId,
          collection: collectionId,
        });

        history.push(path);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex pa3 pb4 pb3-ns justify-end items-center bt b--gray-300 bg-white">
      <StatusContainer
        status={loading ? 'pending' : undefined}
        messages={{pending: 'Adding selected items...'}}
      >
        <div className="flex">
          <div className="w-50 w-auto-ns pr2">
            <Link
              to={generatePath(
                '/collection/:owner/:collection/items/seller/:seller/catalogs',
                {
                  owner: ownerId,
                  collection: collectionId,
                  seller: sellerId,
                }
              )}
            >
              <CommonButton className="pt-18 dark-grey bg-gray-250">
                Back
              </CommonButton>
            </Link>
          </div>
          <div className="w-50 w-auto-ns pl2">
            <CommonButton
              className="pt-18 white bg-brand"
              onClick={handleAddItems}
            >
              Add
            </CommonButton>
          </div>
        </div>
      </StatusContainer>
    </div>
  );
};

export default CatalogItemsFooterContainer;
