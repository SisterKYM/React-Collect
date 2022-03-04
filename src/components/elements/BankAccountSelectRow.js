import React from 'react';

const BankAccountSelectRow = ({bankAccount, selectControl}) => (
  <div className="pa2 mb3 bg-gray-200 br2 avenir-roman dark-grey text-14">
    <div className="flex items-center">
      {selectControl && <div className="pa2">{selectControl}</div>}
      <div className="ph2 avenir-roman">
        {bankAccount.nickname || bankAccount.bank_name}
      </div>
      <div className="flex-auto ph3 tr avenir-roman">*{bankAccount.last4}</div>
    </div>
  </div>
);

const EnhancedBankAccountSelectRow = React.memo(BankAccountSelectRow);

export default EnhancedBankAccountSelectRow;
