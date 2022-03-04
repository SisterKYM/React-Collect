import React, {useCallback, useState} from 'react';

import {CommonButton} from 'elements';

import {
  BankAccountFormContainer,
  CardAccountFormContainer,
  BankAndCardListContainer,
} from './containers';

const PaymentMethodsPage = () => {
  const [bankAccountFormVisible, setBankAccountFormVisible] = useState(false);

  const [debitCardFormVisible, setDebitCardFormVisible] = useState(false);

  const addBankAccount = useCallback(() => {
    setBankAccountFormVisible(true);
  }, []);

  const addDebitCard = useCallback(() => {
    setDebitCardFormVisible(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setBankAccountFormVisible(false);
    setDebitCardFormVisible(false);
  }, []);

  return (
    <>
      <h1 className="avenir-roman dark-grey mb2 tc text-32">Payment Methods</h1>
      <div className="text-18 line-24 dark-grey mb3 tc">
        Pay collections faster by storing your payment methods
      </div>
      {!bankAccountFormVisible && !debitCardFormVisible && (
        <BankAndCardListContainer />
      )}
      <hr className="mt4 mb3-5" />
      <div className="w-70">
        {debitCardFormVisible && (
          <CardAccountFormContainer onDismiss={handleDismiss} />
        )}
        {bankAccountFormVisible && (
          <BankAccountFormContainer onDismiss={handleDismiss} />
        )}
      </div>
      {!bankAccountFormVisible && !debitCardFormVisible && (
        <div className="flex justify-center">
          <CommonButton
            className="bg-tint white pt-16 mr3"
            onClick={addDebitCard}
          >
            Add Credit or Debit Card
          </CommonButton>
          <CommonButton
            className="bg-gray-400 white pt-16"
            onClick={addBankAccount}
          >
            Add Bank Account (eCheck)
          </CommonButton>
        </div>
      )}
    </>
  );
};

const EnhancedPaymentMethodsPage = React.memo(PaymentMethodsPage);

export default EnhancedPaymentMethodsPage;
