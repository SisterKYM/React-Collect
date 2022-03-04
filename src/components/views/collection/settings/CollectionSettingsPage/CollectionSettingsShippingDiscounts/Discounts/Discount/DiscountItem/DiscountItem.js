import PropTypes from 'prop-types';
import React from 'react';

import {SettingItem} from 'views/collection/settings/CollectionSettingsPage/components';
import {currency} from 'helpers/numbers';

import LocalizePendingForm from './LocalizePendingForm';
import SaveCodeForm from '../SaveCodeForm';

const appliesToMapper = (appliesTo) => {
  if (!appliesTo) {
    return '';
  }
  switch (appliesTo) {
    case 'one_item_most_expensive':
      return 'most expensive item';
    case 'total_order_with_minimum':
      return 'total order if spend at least';
    default:
      return appliesTo.split('_').join(' ');
  }
};

const DiscountItem = ({
  id,
  fixedAmount,
  percentage,
  minimumPurchase,
  appliesTo,
  calculationMethod,
  updateMetadata,
  updateStatus,
  deleteStatus,
  browser,
  className,
  code,
  deleteDiscount,
  updateSubmit,
}) => {
  const [deleting, setDeleting] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const amount =
    (fixedAmount && `${currency(fixedAmount)}`) ||
    (percentage && `${percentage}%`);
  const applied = appliesToMapper(appliesTo);

  const description = `${amount} off ${applied}${
    minimumPurchase ? ` ${currency(minimumPurchase)}` : ''
  }`;
  const initialValues = {
    amount: fixedAmount || percentage,
    appliesTo,
    calculationMethod,
    code,
    minimumPurchase,
  };

  const clickClose = React.useCallback(() => {
    setEdit(false);
  }, []);

  const clickEdit = React.useCallback(() => {
    if (!deleting) {
      setEdit((prevEdit) => !prevEdit);
    }
  }, [deleting]);

  const deleteClick = React.useCallback(() => {
    if (!deleting) {
      deleteDiscount(id);
      setDeleting(true);
    }
    if (edit) {
      setEdit(false);
    }
  }, [deleteDiscount, deleting, edit, id]);

  React.useEffect(() => {
    if (deleteStatus !== 'pending') {
      setDeleting(false);
    }
  }, [deleteStatus]);

  React.useEffect(() => {
    if (updateStatus === 'success' && updateMetadata.discount === id) {
      setEdit(false);
    }
  }, [id, updateMetadata, updateStatus]);

  return (
    <li className={className}>
      {!edit ? (
        <SettingItem
          browser={browser}
          clickDelete={deleteClick}
          clickEdit={clickEdit}
          clickLabel={clickEdit}
          deleting={deleting}
          description={description}
          isEditing={edit}
          label={code}
        />
      ) : (
        <LocalizePendingForm formSubmit={updateSubmit} status={updateStatus}>
          <SaveCodeForm
            enableReinitialize
            browser={browser}
            close={clickClose}
            form={`DiscountItem_editForm-${id}`}
            initialValues={initialValues}
            discountId={id}
          />
        </LocalizePendingForm>
      )}
    </li>
  );
};

const EnhancedDiscountItem = Object.assign(React.memo(DiscountItem), {
  propTypes: {
    appliesTo: PropTypes.string,
    browser: PropTypes.shape({
      greaterThan: PropTypes.object,
    }),
    className: PropTypes.string,
    code: PropTypes.string,
    deleteDiscount: PropTypes.func,
    deleteStatus: PropTypes.string,
    fixedAmount: PropTypes.number,
    id: PropTypes.number,
    minimumPurchase: PropTypes.number,
    percentage: PropTypes.number,
    updateStatus: PropTypes.string,
    updateSubmit: PropTypes.func,
  },
});

export default EnhancedDiscountItem;
