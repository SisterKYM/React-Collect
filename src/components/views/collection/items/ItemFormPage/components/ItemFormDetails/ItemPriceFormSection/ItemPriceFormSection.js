import {Field, Fields} from 'redux-form';
import {get} from 'lodash';
import {useSelector} from 'react-redux';
import React from 'react';

import config from 'config';

import ItemAmountField from './ItemAmountField';
import ItemAmountTypeField from './ItemAmountTypeField';
import RecurringPaymentField from './RecurringPaymentField';

const ItemPriceFormSection = ({className, isTeamUser}) => {
  const recurringEnabled = useSelector(state =>
    get(state.form, 'ItemDetailsForm.values.options.recurring.enabled')
  );

  return (
    <div className={className}>
      <div className="flex items-center">
        <div className="mb3 f6 avenir-roman gray-600">Item Price:</div>
      </div>
      {config.isCheddarUp ? (
        <>
          <Fields
            names={['amount_type', 'options.recurring.enabled']}
            component={ItemAmountTypeField}
            itemAmountField={
              <Field
                className="ml3"
                name="amount"
                component={ItemAmountField}
              />
            }
            onWillChangeRecurringEnabled={() => {
              const nextRecurringEnabled = !recurringEnabled;
              const recurringEnabledChangeDenied =
                nextRecurringEnabled && !isTeamUser;

              return !recurringEnabledChangeDenied;
            }}
          />
          <div className="mt3">
            {recurringEnabled && (
              <Fields
                className="mt3"
                names={['options.recurring.options', 'amount', 'amount_type']}
                component={RecurringPaymentField}
              />
            )}
          </div>
        </>
      ) : (
        <Field className="mw4" name="amount" component={ItemAmountField} />
      )}
    </div>
  );
};

const EnhancedItemPriceFormSection = React.memo(ItemPriceFormSection);

export default EnhancedItemPriceFormSection;
