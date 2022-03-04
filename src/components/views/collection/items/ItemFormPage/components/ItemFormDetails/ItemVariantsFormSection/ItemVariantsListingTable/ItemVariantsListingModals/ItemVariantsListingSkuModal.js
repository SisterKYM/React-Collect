import React from 'react';
import {batch, useDispatch} from 'react-redux';
import {change} from 'redux-form';
import pluralize from 'pluralize';

import {Input, InputPrompt} from 'elements';

import {ITEM_FORM_DETAILS_NAME} from '../../../ItemFormDetails';

const ItemVariantsListingSkuModal = ({fieldNames, onDismiss}) => {
  const dispatch = useDispatch();

  const [sku, setSku] = React.useState('');

  const handleChangeQuantityInput = React.useCallback(event => {
    setSku(event.target.value);
  }, []);

  const handleClickSave = React.useCallback(() => {
    batch(() => {
      fieldNames.forEach(fieldName => {
        dispatch(change(ITEM_FORM_DETAILS_NAME, `${fieldName}.sku`, sku));
      });
    });

    onDismiss();
  }, [dispatch, fieldNames, onDismiss, sku]);

  return (
    <InputPrompt
      title={`Enter SKU for ${pluralize('variants', fieldNames.length, true)}`}
      description="SKU will not be visible to customers"
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
          <p className="mb2 f-small avenir-roman">SKU</p>
          <Input
            small
            className="ba"
            borderRadius={false}
            placeholder="Enter SKU"
            onChange={handleChangeQuantityInput}
          />
        </div>
      </div>
    </InputPrompt>
  );
};

const EnhancedItemVariantsListingSkuModal = React.memo(
  ItemVariantsListingSkuModal
);

export default EnhancedItemVariantsListingSkuModal;
