import {useSelector} from 'react-redux';
import React from 'react';

import {PaymentMethodSelect} from './components';

const PaymentMethodSelectContainer = ({
  className,
  addPayment,
  publicCollection,
  cart,
  paymentMethods,
  selectedPaymentMethod,
  onChangeSelectedPaymentMethod,
  value,
  onChangeValue,
}) => {
  const userLoggedIn = useSelector((state) =>
    Boolean(state.session && state.session.user)
  );

  const creditCards = React.useMemo(
    () => (paymentMethods || []).filter(({routing_number}) => !routing_number),
    [paymentMethods]
  );
  const bankAccounts = React.useMemo(
    () =>
      (paymentMethods || []).filter(({routing_number}) =>
        Boolean(routing_number)
      ),
    [paymentMethods]
  );

  React.useEffect(() => {
    if (creditCards.length === 0 && value.creditCard.useSaved) {
      onChangeValue({
        ...value,
        creditCard: {
          ...value.creditCard,
          useSaved: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.creditCard.useSaved, creditCards.length]);

  React.useEffect(() => {
    if (creditCards.length !== 0 && !value.creditCard.id) {
      onChangeValue({
        ...value,
        creditCard: {
          ...value.creditCard,
          id: creditCards[0].id,
          useSaved: true,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.creditCard.id, creditCards.length]);

  React.useEffect(() => {
    if (bankAccounts.length === 0 && value.bankAccount.useSaved) {
      onChangeValue({
        ...value,
        bankAccount: {
          ...value.bankAccount,
          useSaved: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.bankAccount.useSaved, bankAccounts.length]);

  React.useEffect(() => {
    if (bankAccounts.length !== 0 && !value.bankAccount.id) {
      onChangeValue({
        ...value,
        bankAccount: {
          ...value.bankAccount,
          id: bankAccounts[0].id,
          useSaved: true,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.bankAccount.id, bankAccounts.length]);

  return (
    <PaymentMethodSelect
      className={className}
      addPayment={addPayment}
      publicCollection={publicCollection}
      cart={cart}
      userLoggedIn={userLoggedIn}
      creditCards={creditCards}
      bankAccounts={bankAccounts}
      paymentMethod={selectedPaymentMethod}
      onChangePaymentMethod={onChangeSelectedPaymentMethod}
      creditCardFormValue={value.creditCard}
      onChangeCreditCardFormValue={(creditCard) => {
        onChangeValue({...value, creditCard});
      }}
      bankAccountFormValue={value.bankAccount}
      onChangeBankAccountFormValue={(bankAccount) => {
        onChangeValue({...value, bankAccount});
      }}
    />
  );
};

const EnhancedPaymentMethodSelectContainer = React.memo(
  PaymentMethodSelectContainer
);

export default EnhancedPaymentMethodSelectContainer;
