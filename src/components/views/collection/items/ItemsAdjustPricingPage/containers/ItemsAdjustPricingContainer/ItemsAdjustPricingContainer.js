import * as Yup from 'yup';
import {useFetcher, useResource} from 'rest-hooks';
import React from 'react';

import CategoryResource from 'resources/CategoryResource';
import ItemResource from 'resources/ItemResource';
import useForm from 'hooks/useForm';

import {ItemsAdjustPricing} from './components';

const validationSchema = Yup.object().shape({
  percentage: Yup.string()
    .required('Required')
    .matches(/^(?!0$)/, 'Required'),
});

const ItemsAdjustPricingContainer = ({className, collectionId, onDidSave}) => {
  const adjustPrices = useFetcher(ItemResource.adjustPricesListShape());

  const [categories, items] = useResource(
    [CategoryResource.listShape(), {collectionId}],
    [ItemResource.listShape(), {collectionId}]
  );

  const {
    value,
    errorMessages,
    submitting,
    setErrorMessages,
    handleChangeValue,
    handleSubmit,
  } = useForm({
    validationSchema,
    initialValue: {
      direction: 'INCREASE',
      percentage: '',
      basis: 'sale',
      categoryIds: [],
    },
    submit: async () => {
      const percentageAsFloat = Number.parseFloat(value.percentage);
      const parsedPercentage =
        value.direction === 'INCREASE'
          ? 100 + percentageAsFloat
          : 100 - percentageAsFloat;

      const itemIds = items
        .filter(
          ({parent_id}) =>
            value.categoryIds.length === 0 ||
            value.categoryIds.includes(parent_id)
        )
        .map(({id}) => id);

      if (parsedPercentage > 0) {
        await adjustPrices(
          {collectionId},
          {
            tab_item_ids: itemIds,
            percentage: parsedPercentage,
            basis: value.basis,
          }
        );

        onDidSave();
      } else {
        setErrorMessages({percentage: 'Max is 99.99'});
      }
    },
  });

  return (
    <ItemsAdjustPricing
      className={className}
      itemsHaveRetailPrice={items.some((item) => {
        const anyListingHasRetailPrice =
          item.options &&
          item.options.variants &&
          item.options.variants.enabled &&
          item.options.variants.listings.some(
            ({retailPrice}) => typeof retailPrice === 'number'
          );

        return (
          anyListingHasRetailPrice ||
          (item.options && typeof item.options.retailPrice === 'number')
        );
      })}
      categories={categories}
      submitting={submitting}
      errorMessages={errorMessages}
      value={value}
      onChangeValue={handleChangeValue}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedItemsAdjustPricingContainer = React.memo(
  ItemsAdjustPricingContainer
);

export default EnhancedItemsAdjustPricingContainer;
