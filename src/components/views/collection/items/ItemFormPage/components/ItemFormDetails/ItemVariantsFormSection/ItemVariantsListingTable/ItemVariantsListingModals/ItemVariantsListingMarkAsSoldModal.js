import {batch, useDispatch} from 'react-redux';
import {change} from 'redux-form';
import React from 'react';
import {VerificationPrompt} from 'elements';
import {ITEM_FORM_DETAILS_NAME} from '../../../ItemFormDetails';

const ItemVariantsListingMarkAsSoldModal = ({fieldNames, onDismiss}) => {
  const dispatch = useDispatch();

  const handleClickSave = React.useCallback(() => {
    batch(() => {
      fieldNames.forEach((fieldName) => {
        dispatch(
          change(
            ITEM_FORM_DETAILS_NAME,
            `${fieldName}.available_quantity`,
            Number(0)
          )
        );
        dispatch(
          change(ITEM_FORM_DETAILS_NAME, `${fieldName}.amount`, Number(0))
        );
      });
    });

    onDismiss();
  }, [dispatch, fieldNames, onDismiss]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={onDismiss}
      title="Mark selected variants as sold out"
      description="This will mark the selected variants as sold out, do you wish to continue?"
      okButtonLabel="Mark Sold Out"
      onOkButtonClick={handleClickSave}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onDismiss}
    />
  );
};

const EnhancedItemVariantsListingMarkAsSoldModal = React.memo(
  ItemVariantsListingMarkAsSoldModal
);

export default EnhancedItemVariantsListingMarkAsSoldModal;
