import React, {useCallback} from 'react';

const BankItem = ({bank, onDelete}) => {
  const deleteBank = useCallback(() => {
    onDelete(bank);
  }, [bank, onDelete]);

  return (
    <div className="bg-gray-250 mb3-25 br2 flex pv2 ph3 justify-between text-16 items-center">
      <span className="w-30">{bank.account_holder_name}</span>
      <span className="w-30 tc">*{bank.last4}</span>
      <span className="w-30 tint pointer tr text-14" onClick={deleteBank}>
        Delete
      </span>
    </div>
  );
};

const EnhancedBankItem = React.memo(BankItem);

export default EnhancedBankItem;
