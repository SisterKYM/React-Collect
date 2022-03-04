import React from 'react';

import {List} from 'views/user/components/Lists';

import {PaymentMethodsPageContext} from '../PaymentMethodsPage';
import {useHandleDeletePaymentMethod} from '../hooks';

const useBankAccounts = () => {
  const {getPaymentMethodsQuery} = React.useContext(PaymentMethodsPageContext);

  return React.useMemo(() => {
    const bankAccounts =
      (getPaymentMethodsQuery.payload &&
        getPaymentMethodsQuery.payload.banks) ||
      [];

    return bankAccounts.map(bank => ({
      ...bank,
      imgSrc: null,
      name: bank.nickname || bank.bank_name,
    }));
  }, [getPaymentMethodsQuery.payload]);
};

const BankAccountListContainer = () => {
  const bankAccounts = useBankAccounts();
  const handleDelete = useHandleDeletePaymentMethod();

  return <List items={bankAccounts} onDelete={handleDelete} />;
};

const EnhancedBankAccountListContainer = React.memo(BankAccountListContainer);

export default EnhancedBankAccountListContainer;
