import React from 'react';

import {BankAccountSelectRow, BigCheckbox} from 'elements';

import BankAccountForm from './BankAccountForm';

const BankAccountSelect = ({
  userLoggedIn,
  addPayment,
  bankAccounts,
  value,
  onChangeValue,
}) => {
  const handleClickToggleUseSavedCreditCard = React.useCallback(() => {
    onChangeValue({
      ...value,
      useSaved: !value.useSaved,
    });
  }, [value, onChangeValue]);

  return (
    <>
      {value.useSaved ? (
        bankAccounts.map(bankAccount => {
          const handleChangeSelectedBankAccountId = () => {
            onChangeValue({
              ...value,
              id: bankAccount.id,
            });
          };

          return (
            <BankAccountSelectRow
              key={bankAccount.id}
              bankAccount={bankAccount}
              selectControl={
                <BigCheckbox
                  type="radio"
                  name="savedCardId"
                  checked={value.id === bankAccount.id}
                  onChange={handleChangeSelectedBankAccountId}
                />
              }
            />
          );
        })
      ) : (
        <BankAccountForm
          addPayment={addPayment}
          userLoggedIn={userLoggedIn}
          value={value}
          onChangeValue={onChangeValue}
        />
      )}
      {bankAccounts.length !== 0 && (
        <div
          className="mt3 f6 avenir-roman tint dim pointer"
          onClick={handleClickToggleUseSavedCreditCard}
        >
          Use {value.useSaved ? 'New' : 'Saved'} Account
        </div>
      )}
    </>
  );
};

const EnhancedBankAccountSelect = React.memo(BankAccountSelect);

export default EnhancedBankAccountSelect;
