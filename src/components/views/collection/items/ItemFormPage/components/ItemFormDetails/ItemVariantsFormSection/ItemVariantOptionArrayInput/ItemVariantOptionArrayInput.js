import {Field} from 'redux-form';
import React from 'react';
import cx from 'classnames';

import {Button} from 'elements';

import ItemVariantNameSelect from './ItemVariantNameSelect';
import ItemVariantValuesSelect from './ItemVariantValuesSelect';

const MAX_OPTION_COUNT = 3;

const validateRequiredField = value =>
  !value || value.length === 0 ? '* Required' : undefined;

const ItemVariantOptionArrayInput = ({
  variantOptionKeys,
  variantOptionValues,
  fields,
}) => {
  const options = fields.getAll();
  const lastOption = options[options.length - 1];
  const optionValuesTitleHidden =
    options.length === 1 && options[0].key.length === 0;
  const existingVariantOptionKeys = options.map(({key}) => key);

  return (
    <>
      <div className="cf mt4 f-small avenir-roman dark-grey">
        <div className="fl w5 mr3">Option name</div>
        {!optionValuesTitleHidden && <div className="fl w5">Option values</div>}
      </div>
      <div className="cf mt3">
        {fields.map((fieldName, idx) => {
          const option = options[idx];

          return (
            <div key={fieldName} className={cx('cf', idx !== 0 && 'mt3')}>
              <Field
                name={`${fieldName}.key`}
                className="fl w5 mr3"
                disabled={option.values.length > 1}
                clearable={option.values.length <= 1}
                variantOptionKeys={variantOptionKeys.filter(
                  key => !existingVariantOptionKeys.includes(key)
                )}
                component={ItemVariantNameSelect}
                validate={validateRequiredField}
                onDelete={() => {
                  fields.remove(idx);
                }}
              />
              {(option.key.length !== 0 || option.values.length !== 0) && (
                <Field
                  name={`${fieldName}.values`}
                  className="fl w5"
                  variantOptionValues={variantOptionValues[option.key] || []}
                  optionName={option.key}
                  optionValue={option.value}
                  component={ItemVariantValuesSelect}
                  validate={validateRequiredField}
                />
              )}
            </div>
          );
        })}
      </div>
      <Button
        small
        colorSet
        backgroundColorSet
        className="mt3 gray-600 bg-gray-200"
        disabled={
          (Boolean(lastOption) &&
            ((lastOption.key || '').length === 0 ||
              lastOption.values.length === 0)) ||
          fields.length === MAX_OPTION_COUNT
        }
        type="button"
        onClick={() => {
          fields.push({
            key: '',
            values: [],
          });
        }}
      >
        Add option
      </Button>
    </>
  );
};

const EnhancedItemVariantOptionArrayInput = React.memo(
  ItemVariantOptionArrayInput
);

export default EnhancedItemVariantOptionArrayInput;
