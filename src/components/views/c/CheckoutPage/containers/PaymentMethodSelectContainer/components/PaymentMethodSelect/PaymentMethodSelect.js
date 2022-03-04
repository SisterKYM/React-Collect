import _ from 'lodash';
import cx from 'classnames';
import React from 'react';
import CartHelpers from 'helpers/CartHelpers';
import {MarkdownParagraph} from 'elements';

import {MasterDetailLayout} from '../../../../components';
import BankAccountSelect from './BankAccountSelect';
import CreditCardSelect from './CreditCardSelect';

const PaymentMethodSelect = ({
  className,
  addPayment,
  publicCollection,
  cart,
  userLoggedIn,
  creditCards,
  bankAccounts,
  paymentMethod,
  onChangePaymentMethod,
  creditCardFormValue,
  onChangeCreditCardFormValue,
  bankAccountFormValue,
  onChangeBankAccountFormValue,
}) => {
  const instructions = CartHelpers.censorInstructions(
    publicCollection?.offlinePaymentInstructions,
    publicCollection?.userManagesCollection
  );

  const masterStates = React.useMemo(() => {
    const cartHasRecurringItems = _.some(
      (cart && cart.items) || [],
      'tab_item.options.recurring.enabled'
    );

    return [
      {
        key: 'CREDIT_CARD',
        title: 'Credit Card',
      },
      (publicCollection.acceptsEcheck || addPayment) && {
        key: 'ECHECK',
        title: 'eCheck',
      },
      (publicCollection.acceptsCash || addPayment) &&
        !cartHasRecurringItems && {
          key: 'CASH_OR_CHECK',
          title: 'Cash or Check',
        },
    ].filter(Boolean);
  }, [publicCollection, cart, addPayment]);

  return (
    <MasterDetailLayout
      className={cx('ph3 ph4-ns pv4 bg-white br2-ns shadow-6', className)}
      heading={
        publicCollection.acceptsEcheck ||
        publicCollection.acceptsCash ||
        addPayment
          ? 'How would you like to pay?'
          : 'Payment Method'
      }
      masterStates={masterStates}
      selectedMasterStateKey={paymentMethod}
      onChangeSelectedMasterStateKey={onChangePaymentMethod}
      renderDetail={() => {
        switch (paymentMethod) {
          case 'CREDIT_CARD':
            return (
              <CreditCardSelect
                userLoggedIn={userLoggedIn}
                addPayment={addPayment}
                creditCards={creditCards}
                value={creditCardFormValue}
                onChangeValue={onChangeCreditCardFormValue}
              />
            );
          case 'ECHECK':
            return (
              <BankAccountSelect
                userLoggedIn={userLoggedIn}
                addPayment={addPayment}
                bankAccounts={bankAccounts}
                value={bankAccountFormValue}
                onChangeValue={onChangeBankAccountFormValue}
              />
            );
          case 'CASH_OR_CHECK':
            return publicCollection.offlinePaymentInstructions ? (
              <>
                <MarkdownParagraph
                  className="payment-method-select-markdown-paragraph pa3 f6 bg-gray-200 br2"
                  markdown={instructions}
                />
                <style jsx>{`
                  :global(.payment-method-select-markdown-paragraph) {
                    line-height: 1.4285 !important;
                  }
                `}</style>
              </>
            ) : null;
          default:
            return null;
        }
      }}
    />
  );
};

const EnhancedPaymentMethodSelect = React.memo(PaymentMethodSelect);

export default EnhancedPaymentMethodSelect;
