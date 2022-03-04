import {change, Field, reduxForm} from 'redux-form';
import React from 'react';
import _ from 'lodash';

import {Input} from 'elements';
import {formErrors} from 'theme/constants';
import config from 'config';

import ItemFormAdvancedSettingsSwitch from './ItemFormAdvancedSettingsSwitch';

const ITEM_FORM_ADVANCED_SETTINGS_NAME = 'ItemFormAdvancedSettings';

const ItemFormAdvancedSettings = ({
  availableQuantityEnabled,
  amountType,
  handleSubmit,
  onSubmit,
}) => (
  <form
    className="mw6-ns advanced-setting-form-wrapper"
    onSubmit={handleSubmit(onSubmit)}
  >
    {amountType !== 'open' && (
      <Field
        className="pv4 bb b--gray-300 f6"
        name="allow_quantity"
        label="Show a quantity selector"
        description="Allow payers to buy more than one of this item. (Not recommended if you add item questions.)"
        component={ItemFormAdvancedSettingsSwitch}
      />
    )}
    <div className="pv4 bb b--gray-300 f6">
      <Field
        className={availableQuantityEnabled ? 'mb3' : ''}
        name="available_quantity_enabled"
        label="Set available quantity"
        description="“Sold out” will show when all available items have been purchased."
        component={ItemFormAdvancedSettingsSwitch}
      />
      {availableQuantityEnabled && (
        <>
          <div className="mb2 f6 avenir-roman gray-600">Total Available:</div>
          <Field
            border
            className="mw4"
            borderRadius
            name="available_quantity"
            placeholder="Qty."
            component={Input}
          />
        </>
      )}
    </div>
    {availableQuantityEnabled && (
      <Field
        className="pv4 bb b--gray-300 f6"
        name="options.makeAvailableQuantityPublic"
        label="Make available quantity public"
        description="Payers will see how many items are left to purchase."
        component={ItemFormAdvancedSettingsSwitch}
      />
    )}
    {config.enabledFeatures.makeItemRequired && (
      <Field
        className="pv4 f6"
        name="required"
        label="Make item required"
        description={
          <div>
            <span className="avenir-heavy">
              Only toggle this on if this item is required for every payer.
            </span>{' '}
            <span className="avenir-light">
              Payers will not be able to proceed to checkout without adding this
              item to their cart.
            </span>
          </div>
        }
        component={ItemFormAdvancedSettingsSwitch}
      />
    )}
    <style jsx>{`
      .advanced-setting-form-wrapper {
        line-height: 1.25rem;
      }
    `}</style>
  </form>
);

const enhance = reduxForm({
  form: ITEM_FORM_ADVANCED_SETTINGS_NAME,
  destroyOnUnmount: false,
  validate: (values) => {
    const err = {};

    if (
      values.available_quantity_enabled &&
      _.isNil(values.available_quantity)
    ) {
      err.available_quantity = formErrors.REQUIRED;
    }

    return err;
  },
  onChange: (values, dispatch, _props, prevValues) => {
    if (
      prevValues.available_quantity_enabled &&
      !values.available_quantity_enabled
    ) {
      dispatch(
        change(
          ITEM_FORM_ADVANCED_SETTINGS_NAME,
          'options.makeAvailableQuantityPublic',
          false
        )
      );
    }
  },
});

const EnhancedItemFormAdvancedSettings = enhance(ItemFormAdvancedSettings);

export {ITEM_FORM_ADVANCED_SETTINGS_NAME};
export default EnhancedItemFormAdvancedSettings;
