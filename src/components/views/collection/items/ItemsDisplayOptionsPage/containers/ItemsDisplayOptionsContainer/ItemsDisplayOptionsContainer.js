import {useFetcher, useResource} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import CategoryResource from 'resources/CategoryResource';
import CollectionResource from 'resources/CollectionResource';
import useForm from 'hooks/useForm';

import {ItemsDisplayOptions} from './components';

const ItemsDisplayOptionsContainer = ({className, collectionId, onDidSave}) => {
  const [categories, collection] = useResource(
    [CategoryResource.listShape(), {collectionId}],
    [CollectionResource.detailShape(), {id: collectionId}]
  );
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());
  const updateCategory = useFetcher(CategoryResource.partialUpdateShape());

  const {value, submitting, handleChangeValue, handleSubmit} = useForm({
    initialValue: {
      hideSoldOutItems: collection.options.hideSoldOutItems || false,
      defaultToGalleryView: collection.options.defaultToGalleryView || false,
      displayNavigationMenu: _.some(categories, 'anchor'),
      categoryIds: categories.filter(({anchor}) => anchor).map(({id}) => id),
    },
    submit: async () => {
      await updateCollection(
        {id: collectionId},
        {
          options: {
            ...collection.options,
            hideSoldOutItems: value.hideSoldOutItems,
            defaultToGalleryView: value.defaultToGalleryView,
          },
        }
      );

      const anchoredCategoryIds = value.displayNavigationMenu
        ? value.categoryIds
        : [];

      const updatedCategoryIds = categories
        .filter(
          ({id, anchor}) =>
            anchoredCategoryIds.includes(id) !== (anchor || false)
        )
        .map(({id}) => id);
      const updateCategoryPromises = updatedCategoryIds.map(id =>
        updateCategory(
          {id, collectionId},
          {anchor: anchoredCategoryIds.includes(id)}
        )
      );

      await Promise.all(updateCategoryPromises);

      onDidSave();
    },
  });

  return (
    <ItemsDisplayOptions
      className={className}
      categories={categories}
      submitting={submitting}
      value={value}
      onChangeValue={handleChangeValue}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedItemsDisplayOptionsContainer = React.memo(
  ItemsDisplayOptionsContainer
);

export default EnhancedItemsDisplayOptionsContainer;
