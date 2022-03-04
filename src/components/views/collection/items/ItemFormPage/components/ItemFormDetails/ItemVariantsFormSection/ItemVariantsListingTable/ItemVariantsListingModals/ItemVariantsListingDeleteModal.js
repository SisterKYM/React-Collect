import {batch, useDispatch} from 'react-redux';
import {arrayRemove} from 'redux-form';
import _ from 'lodash';
import React from 'react';

import {VerificationPrompt} from 'elements';

import {ITEM_FORM_DETAILS_NAME} from '../../../ItemFormDetails';

const ItemVariantsListingDeleteModal = ({
  arrayFieldName,
  fieldIndexes,
  onDismiss,
}) => {
  const dispatch = useDispatch();

  const handleClickOk = React.useCallback(() => {
    const descSortedFieldIndexes = _.orderBy(fieldIndexes, _.identity, [
      'desc',
    ]);

    batch(() => {
      descSortedFieldIndexes.forEach((fieldIdx) => {
        dispatch(arrayRemove(ITEM_FORM_DETAILS_NAME, arrayFieldName, fieldIdx));
      });
    });

    onDismiss();
  }, [arrayFieldName, dispatch, fieldIndexes, onDismiss]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={onDismiss}
      title="Delete selected variants"
      description="This will delete the selected variants from your variant table and from your collection, do you wish to continue?"
      okButtonLabel="Delete"
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onDismiss}
      onOkButtonClick={handleClickOk}
    />
  );
};

const EnhancedItemVariantsListingDeleteModal = React.memo(
  ItemVariantsListingDeleteModal
);

export default EnhancedItemVariantsListingDeleteModal;
