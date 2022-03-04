import {useSelector} from 'react-redux';
import {useResource} from 'rest-hooks';
import React from 'react';
import _ from 'lodash';

import CategoryResource from 'resources/CategoryResource';

import {ItemFormDetails, ITEM_FORM_DETAILS_NAME} from '../../components';

const ItemFormDetailsContainer = ({
  innerRef,
  collectionId,
  initialValues,
  isTeamUser,
  isProUser,
  item,
  items,
  onSubmit,
}) => {
  const categories = useResource(CategoryResource.listShape(), {collectionId});

  const variantsEnabled = useSelector(
    (state) =>
      state.form[ITEM_FORM_DETAILS_NAME]?.values?.options?.variants.enabled
  );
  const selectedParentId = useSelector(
    (state) => state.form[ITEM_FORM_DETAILS_NAME]?.values?.parent_id
  );

  const subcategories = React.useMemo(() => {
    const selectedCategory = categories.find(
      (category) => String(category.id) === String(selectedParentId)
    );

    return (selectedCategory && selectedCategory.options.subcategories) || [];
  }, [categories, selectedParentId]);

  const variantOptionKeys = React.useMemo(
    () =>
      _.uniq(
        _.flatMap(items, (item) =>
          ((item.options.variants && item.options.variants.options) || [])
            .map(({key}) => key)
            .filter((key) => key.length !== 0)
        )
      ),
    [items]
  );
  const variantOptionValues = React.useMemo(() => {
    const allVariantOptions = _.flatMap(
      items,
      (item) => (item.options.variants && item.options.variants.options) || []
    );
    const variantOptionValuePairs = allVariantOptions.map(({key, values}) => [
      key,
      values,
    ]);

    return _.fromPairs(
      variantOptionValuePairs.map(([key, values]) => {
        const allValuesForKey = _.uniq(
          _.flatten([
            ...allVariantOptions
              .filter((option) => option.key === key)
              .map((option) => option.values),
            ...values,
          ])
        );

        return [key, allValuesForKey];
      })
    );
  }, [items]);

  return (
    <ItemFormDetails
      ref={innerRef}
      isTeamUser={isTeamUser}
      isProUser={isProUser}
      item={item}
      variantsEnabled={variantsEnabled}
      variantOptionKeys={variantOptionKeys}
      variantOptionValues={variantOptionValues}
      categories={categories}
      subcategories={subcategories}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
};

const EnhancedItemFormDetailsContainer = React.memo(ItemFormDetailsContainer);

export default EnhancedItemFormDetailsContainer;
