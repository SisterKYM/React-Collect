import {useFetcher, useResource} from 'rest-hooks';
import _ from 'lodash';
import cx from 'classnames';
import Fuse from 'fuse.js';
import React from 'react';
import ReactSortable from 'react-sortablejs';

import {sortableOptions} from 'theme/sortable';
import {PageTitle} from 'layout/components';
import {StatefulView} from 'elements';
import CategoryResource from 'resources/CategoryResource';
import ItemResource from 'resources/ItemResource';
import config from 'config';
import {collectionsPathHelper} from 'helpers';

import {AddItemCTAPanel, ItemList} from './components';
import ItemListCategory from './ItemListCategory';
import ItemsToolbarContainer from './ItemsToolbarContainer';

const ItemsContainer = ({
  className,
  collection,
  itemCatalogSellers,
  items: fetchedItems,
}) => {
  const fetchedCategories = useResource(CategoryResource.listShape(), {
    collectionId: collection.id,
  });

  const sortItems = useFetcher(ItemResource.sortListShape());
  const sortCategories = useFetcher(CategoryResource.sortListShape());
  // we need items and categories in state, because categories cache
  // can not be updated automatically for sorting
  const [categories, setCategories] = React.useState(fetchedCategories);
  const [items, setItems] = React.useState(fetchedItems);

  const sortedItems = _.sortBy(items, ['position']);
  const itemsNoCategory = sortedItems.filter(({parent_id}) => !parent_id);

  const fetchedCategoriesKey = fetchedCategories
    .map((category) => JSON.stringify(category))
    .join(',');
  const fetchedItemsKey = fetchedItems
    .map((item) => JSON.stringify(item))
    .join(',');

  React.useEffect(() => {
    setCategories(fetchedCategories);
  }, [fetchedCategoriesKey]); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    setItems(fetchedItems);
  }, [fetchedItemsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const itemRowRefs = sortedItems.reduce(
    (acc, value) => ({
      ...acc,
      [value.id]: React.createRef(),
    }),
    {}
  );
  const handleItemSort = (order, categoryId) => {
    const orderedItemIds = order.map(Number);

    setItems((prevItems) =>
      prevItems.map((item) => {
        const nextPosition = orderedItemIds.findIndex(
          (orderedItemId) => orderedItemId === item.id
        );

        return {
          ...item,
          parent_id: nextPosition === -1 ? item.parent_id : categoryId,
          position: nextPosition === -1 ? item.position : nextPosition,
        };
      })
    );

    sortItems(
      {collectionId: collection.id},
      {parent_id: categoryId || null, order: orderedItemIds}
    );
  };

  return (
    <StatefulView
      className={cx('pt3 ph3 center', className)}
      resultCount={sortedItems.length}
      renderEmptyStateView={() => (
        <>
          <PageTitle className="pt2 mt4 mb3 dark-grey">Items</PageTitle>
          <div className="flex mt4">
            <AddItemCTAPanel
              openPath={
                config.behaviors.openProductCatalogOnBuilderCTAIfNoItems &&
                itemCatalogSellers[0]
                  ? collectionsPathHelper(
                      collection,
                      `items/seller/${itemCatalogSellers[0].id}/catalogs`
                    )
                  : collectionsPathHelper(collection, 'items/add-item')
              }
            />
          </div>
        </>
      )}
    >
      <PageTitle className="pt2 mt4 mb3 dark-grey">Items</PageTitle>
      <ItemsToolbarContainer
        className="mb3"
        collection={collection}
        onSearch={(keyword) => {
          const fuse = new Fuse(sortedItems, {
            keys: ['name'],
            threshold: 0.1,
            shouldSort: true,
          });

          const item = fuse.search(keyword)[0];
          if (item && item.item) {
            itemRowRefs[item.item.id].current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }

          return item;
        }}
      />
      <ReactSortable
        options={{
          ...sortableOptions,
          group: 'categories',
        }}
        onChange={(order) => {
          const orderedCategoryIds = order.map((categoryId) =>
            Number(categoryId)
          );

          setCategories((prevCategories) =>
            orderedCategoryIds.map((categoryId) =>
              prevCategories.find(({id}) => id === categoryId)
            )
          );

          sortCategories(
            {collectionId: collection.id},
            {order: orderedCategoryIds}
          );
        }}
      >
        {categories.map((category) => (
          <div key={category.id} data-id={category.id} className="mb3">
            <ItemListCategory
              itemRowRefs={itemRowRefs}
              collection={collection}
              category={category}
              itemCount={items.length}
              items={sortedItems.filter(
                ({parent_id}) => parent_id === category.id
              )}
              onSort={handleItemSort}
            />
          </div>
        ))}
      </ReactSortable>
      <ItemList
        itemRowRefs={itemRowRefs}
        className="ph2 ph3-ns pv3 ba b--gray-300 br2-ns shadow-light bg-white"
        itemCount={items.length}
        sortableOptions={sortableOptions}
        collection={collection}
        items={itemsNoCategory}
        onSort={handleItemSort}
      />
    </StatefulView>
  );
};

const EnhancedItemsContainer = React.memo(ItemsContainer);

export default EnhancedItemsContainer;
