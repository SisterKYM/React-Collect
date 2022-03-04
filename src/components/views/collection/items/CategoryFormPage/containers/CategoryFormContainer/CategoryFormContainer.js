import {compose} from 'recompose';
import {useFetcher, useInvalidator, useResource} from 'rest-hooks';
import _ from 'lodash';
import React from 'react';

import CategoryResource from 'resources/CategoryResource';
import CollectionResource from 'resources/CollectionResource';

import {CategoryForm} from './components';

const useInitialValues = ({collectionId, categoryId}) => {
  const category = useResource(
    CategoryResource.detailShape(),
    categoryId
      ? {
          id: categoryId,
          collectionId,
        }
      : null
  );

  return React.useMemo(
    () => ({
      name: (category && category.name) || '',
      description: (category && category.description) || '',
      options: {
        subcategories: _.get(category, 'options.subcategories', []),
      },
    }),
    [category]
  );
};

const useHandleSubmit = ({collectionId, categoryId, onDidSave}) => {
  const invalidateCategoryList = useInvalidator(CategoryResource.listShape());
  const createCategory = useFetcher(CategoryResource.createShape());
  const updateCategory = useFetcher(CategoryResource.partialUpdateShape());

  return React.useCallback(
    async values => {
      const parsedValues = {
        ...values,
        anchor: false,
        options: {
          ...values.options,
          subcategories: values.options.subcategories.filter(({name}) =>
            Boolean(name)
          ),
        },
      };

      if (categoryId) {
        await updateCategory(
          {
            id: categoryId,
            collectionId,
          },
          parsedValues
        );
      } else {
        await createCategory({collectionId}, parsedValues);
        invalidateCategoryList({collectionId});
      }

      onDidSave();
    },
    [
      collectionId,
      categoryId,
      onDidSave,
      updateCategory,
      createCategory,
      invalidateCategoryList,
    ]
  );
};

const CategoryFormContainer = (
  {className, collectionId, categoryId, onDidSave},
  ref
) => {
  const initialValues = useInitialValues({collectionId, categoryId});
  const handleSubmit = useHandleSubmit({collectionId, categoryId, onDidSave});
  const subcategoriesEnabled = useResource(CollectionResource.detailShape(), {
    id: collectionId,
  }).isCatalog;

  return (
    <CategoryForm
      ref={ref}
      className={className}
      subcategoriesEnabled={subcategoriesEnabled}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedCategoryFormContainer = compose(
  React.memo,
  React.forwardRef
)(CategoryFormContainer);

export default EnhancedCategoryFormContainer;
