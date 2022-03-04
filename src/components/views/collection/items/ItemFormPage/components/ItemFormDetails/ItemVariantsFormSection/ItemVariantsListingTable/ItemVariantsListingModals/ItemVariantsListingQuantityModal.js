import {batch, useDispatch} from 'react-redux';
import {change} from 'redux-form';
import React from 'react';
import pluralize from 'pluralize';

import {Input, InputPrompt} from 'elements';

import {ITEM_FORM_DETAILS_NAME} from '../../../ItemFormDetails';

const ItemVariantsListingQuantityModal = ({fieldNames, onDismiss}) => {
  const dispatch = useDispatch();

  const [quantityValue, setQuantityValue] = React.useState('');

  const handleChangeQuantityInput = React.useCallback(event => {
    setQuantityValue(event.target.value);
  }, []);

  const handleClickSave = React.useCallback(() => {
    const normalizedQuantity = Number(quantityValue);

    batch(() => {
      fieldNames.forEach(fieldName => {
        dispatch(
          change(
            ITEM_FORM_DETAILS_NAME,
            `${fieldName}.available_quantity`,
            normalizedQuantity
          )
        );
      });
    });

    onDismiss();
  }, [dispatch, fieldNames, onDismiss, quantityValue]);

  return (
    <InputPrompt
      title={`Enter available quantity for ${pluralize(
        'variants',
        fieldNames.length,
        true
      )}`}
      description={`"Sold out" will show when all available variants have been purchased.`}
      flexibleHeight
      onDismiss={onDismiss}
      okButtonLabel="Save"
      okButtonClassName="bg-tint white"
      onOkButtonClick={handleClickSave}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onDismiss}
    >
      <div className="cf pv3">
        <div className="fl pr2 w-50">
          <p className="mb2 f-small avenir-roman">Qty Available:</p>
          <Input
            small
            className="ba br2"
            borderRadius={false}
            placeholder="Qty Available"
            onChange={handleChangeQuantityInput}
          />
        </div>
      </div>
    </InputPrompt>
  );
};

const EnhancedItemVariantsListingQuantityModal = React.memo(
  ItemVariantsListingQuantityModal
);

export default EnhancedItemVariantsListingQuantityModal;
