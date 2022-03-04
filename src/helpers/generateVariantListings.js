import _ from 'lodash';
import cartesianProduct from 'cartesian';
import {v4 as uuid} from 'uuid';

const generateIdFromOptionValues = (optionValues) =>
  Object.keys(optionValues)
    .map((optionValueKey) => `${optionValueKey}${optionValues[optionValueKey]}`)
    .join('$$');

const generateVariantListings = (variantOptions, existingListings = []) => {
  const keyValuesMap = Object.assign(
    {},
    ...variantOptions
      .filter(({values}) => values.length !== 0)
      .map(({key, values}) => ({
        [key]: values,
      }))
  );
  const variantValuesCombinations = cartesianProduct(keyValuesMap);
  const newVariantListings = variantValuesCombinations.map((optionValues) => ({
    optionValues,
    uuid: uuid(),
    sku: null,
    amount: null,
    imageId: null,
    description: null,
    retailPrice: null,
    available_quantity: null,
  }));

  const allValues = _.flatten(Object.values(keyValuesMap));

  const updatedExistingListings = existingListings.map((listing) => {
    const allListingValueKeys = Object.keys(listing.optionValues);

    return {
      ...listing,
      optionValues: {
        ..._.pickBy(
          _.mapValues(listing.optionValues, (value) =>
            allValues.includes(value) ? value : null
          ),
          Boolean
        ),
        ..._.pickBy(
          _.mapValues(keyValuesMap, (values, key) =>
            allListingValueKeys.includes(key) ? null : values[0]
          ),
          Boolean
        ),
      },
    };
  });

  return newVariantListings.map((newListing) => {
    const id = generateIdFromOptionValues(newListing.optionValues);
    return (
      updatedExistingListings.find(
        (oldListing) =>
          generateIdFromOptionValues(oldListing.optionValues) === id
      ) || newListing
    );
  });
};

export default generateVariantListings;
