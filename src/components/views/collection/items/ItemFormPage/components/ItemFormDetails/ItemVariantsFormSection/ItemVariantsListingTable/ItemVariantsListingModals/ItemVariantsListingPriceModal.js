import {batch, useDispatch} from 'react-redux';
import {change} from 'redux-form';
import React from 'react';
import pluralize from 'pluralize';

import {Input, InputPrompt} from 'elements';
import normalizeAmount from 'helpers/normalizeAmount';

import {ITEM_FORM_DETAILS_NAME} from '../../../ItemFormDetails';

const ItemVariantsListingPriceModal = ({fieldNames, onDismiss}) => {
  const dispatch = useDispatch();

  const [amountValue, setAmountValue] = React.useState('');
  const [retailPriceValue, setRetailPriceValue] = React.useState('');

  return (
    <InputPrompt
      title={`Enter pricing for ${pluralize(
        'variants',
        fieldNames.length,
        true
      )}`}
      flexibleHeight
      onDismiss={onDismiss}
      okButtonLabel="Save"
      okButtonClassName="bg-tint white"
      onOkButtonClick={() => {
        batch(() => {
          fieldNames.forEach(fieldName => {
            dispatch(
              change(
                ITEM_FORM_DETAILS_NAME,
                `${fieldName}.amount`,
                normalizeAmount(amountValue)
              )
            );
            dispatch(
              change(
                ITEM_FORM_DETAILS_NAME,
                `${fieldName}.retailPrice`,
                normalizeAmount(retailPriceValue)
              )
            );
          });
        });

        onDismiss();
      }}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onDismiss}
    >
      <div className="cf">
        <div className="fl pr2 w-50">
          <p className="mb2 f-small avenir-roman">Item price:</p>
          <Input
            small
            className="ba br2"
            borderRadius={false}
            placeholder="$0"
            onChange={event => {
              setAmountValue(event.target.value);
            }}
          />
        </div>
        <div className="fl pl2 w-50">
          <p className="mb2 f-small avenir-roman">Compare at price:</p>
          <Input
            small
            className="ba br2"
            borderRadius={false}
            placeholder="$ Optional"
            onChange={event => {
              setRetailPriceValue(event.target.value);
            }}
          />
        </div>
      </div>
    </InputPrompt>
  );
};

const EnhancedItemVariantsListingPriceModal = React.memo(
  ItemVariantsListingPriceModal
);

export default EnhancedItemVariantsListingPriceModal;
