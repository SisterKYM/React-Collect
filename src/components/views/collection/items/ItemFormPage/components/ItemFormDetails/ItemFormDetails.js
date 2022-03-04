import {change, Field, reduxForm} from 'redux-form';
import React from 'react';
import _ from 'lodash';

import {Input, Select, SwitchBox} from 'elements';
import {formErrors} from 'theme/constants';
import {isNumeric} from 'helpers/numbers';
import config from 'config';
import generateVariantListings from 'helpers/generateVariantListings';

import ItemPriceFormSection from './ItemPriceFormSection';
import ItemVariantsFormSection from './ItemVariantsFormSection';

const ITEM_FORM_DETAILS_NAME = 'ItemDetailsForm';

const ItemFormDetails = ({
  initialValues,
  isTeamUser,
  isProUser,
  item,
  categories,
  subcategories,
  variantOptionKeys,
  variantOptionValues,
  initialize,
  variantsEnabled,
  handleSubmit,
  onSubmit,
}) => {
  /*
    ItemFormDetails is destroyed after ItemFormPage unmount.
    Often destroy action may be dispatched AFTER initialize action
    (after user plan upgrades).
    That's why we initialize it here AGAIN.
  */
  React.useEffect(() => {
    if (!variantsEnabled) {
      setTimeout(() => {
        initialize(initialValues);
      }, 500);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pv3">
        <div className="mt3 mb2 f6 avenir-roman gray-600">Item Name:</div>
        <div className="flex flex-wrap">
          <div className="w-100 w-50-ns">
            <Field
              border
              borderRadius
              name="name"
              component={Input}
              placeholder="Item Name"
            />
          </div>
          {categories.length !== 0 && (
            <div className="w-100 w-50-ns mt3 mt0-ns pl3-ns">
              <Field
                className="ba"
                borderRadius
                style={{height: 40, fontSize: 16}}
                name="parent_id"
                component={Select}
                options={[
                  {
                    children: 'Add to Category',
                    value: '',
                  },
                  ...categories.map((category) => ({
                    children: category.name,
                    value: category.id,
                  })),
                ]}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center">
          <div className="w-100 w-50-ns pv3 order-1 order-0-ns">
            <Field
              small
              disabled={config.siteName === 'PIXIE_LANE' && variantsEnabled}
              name="options.variants.enabled"
              label="Add variations"
              component={SwitchBox}
            />
          </div>
          {subcategories.length !== 0 && (
            <div className="w-100 w-50-ns mt3 mt0-ns pl3-ns pv2">
              <Field
                className="ba"
                borderRadius
                style={{height: 40, fontSize: 16}}
                name="options.subcategoryId"
                component={Select}
                options={[
                  {
                    children: 'Add to Subcategory',
                    value: '',
                  },
                  ...subcategories.map((subcategory) => ({
                    children: subcategory.name,
                    value: subcategory.uuid,
                  })),
                ]}
              />
            </div>
          )}
        </div>
      </div>
      <div className="pv3">
        {variantsEnabled ? (
          <ItemVariantsFormSection
            item={item}
            isProUser={isProUser}
            variantOptionKeys={variantOptionKeys}
            variantOptionValues={variantOptionValues}
          />
        ) : (
          <ItemPriceFormSection isTeamUser={isTeamUser} />
        )}
      </div>
    </form>
  );
};

const enhance = reduxForm({
  form: ITEM_FORM_DETAILS_NAME,
  touchOnChange: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: (values) => {
    const err = {};

    if (!values.name) {
      err.name = formErrors.REQUIRED;
    } else if (
      values.name &&
      values.name.length > config.validations.maxItemNameLength
    ) {
      err.name = `Must be ${config.validations.maxItemNameLength} characters or less`;
    }

    if (
      values.options &&
      !values.options.variants.enabled &&
      values.amount_type === 'fixed' &&
      !isNumeric(values.amount)
    ) {
      err.amount = formErrors.REQUIRED;
    }

    if (
      values.options &&
      values.options.variants.enabled &&
      (!values.options.variants.options ||
        values.options.variants.options.length === 0)
    ) {
      err.variants = formErrors.REQUIRED;
    }

    return err;
  },
  onChange: (values, dispatch, _props, prevValues) => {
    if (!prevValues.options || !values.options) {
      return;
    }

    if (
      !_.isEqual(
        values.options.variants.options,
        prevValues.options.variants.options
      )
    ) {
      dispatch(
        change(
          ITEM_FORM_DETAILS_NAME,
          'options.variants.listings',
          generateVariantListings(
            values.options.variants.options,
            values.options.variants.listings
          )
        )
      );
    }

    if (
      values.options.variants.listings &&
      prevValues.options.variants.listings &&
      values.options.variants.listings.length <
        prevValues.options.variants.listings.length
    ) {
      const allListingOptionValues = values.options.variants.listings.map(
        ({optionValues}) => optionValues
      );
      const allListintOptionValuesKeys = _.flatMap(
        allListingOptionValues,
        (optionValues) => Object.keys(optionValues)
      );
      const optionValuesMap = _.fromPairs(
        allListintOptionValuesKeys.map((optionValuesKey) => {
          const value = _.uniq(
            allListingOptionValues.map(
              (innerOptionValues) => innerOptionValues[optionValuesKey]
            )
          );

          return [optionValuesKey, value];
        })
      );

      dispatch(
        change(
          ITEM_FORM_DETAILS_NAME,
          'options.variants.options',
          values.options.variants.options.map((option) => ({
            ...option,
            values: option.values.filter(
              (value) =>
                optionValuesMap[option.key] &&
                optionValuesMap[option.key].includes(value)
            ),
          }))
        )
      );
    }
  },
});

const EnhancedItemFormDetails = enhance(ItemFormDetails);

export {ITEM_FORM_DETAILS_NAME};
export default EnhancedItemFormDetails;
