import React from 'react';

const SelectBankAccountList = ({bankAccounts, onChange}) => (
  <>
    {bankAccounts.map(bankAccount => {
      const handleClick = () => {
        onChange(bankAccount);
      };

      return (
        <div
          key={bankAccount.id}
          className="pa3 gray-600 text-14 avenir-roman hover-bg-light-aqua pointer"
          onClick={handleClick}
        >
          {bankAccount.nickname || bankAccount.bank_name}: ***
          {bankAccount.last4}
        </div>
      );
    })}
  </>
);

const EnhancedSelectBankAccountList = React.memo(SelectBankAccountList);

export default EnhancedSelectBankAccountList;
