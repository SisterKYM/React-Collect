import * as cx from 'redux/modules/bankAccounts/constants';

export const getBankAccounts = payload => ({
  payload,
  type: cx.GET_BANK_ACCOUNTS,
});

export const deleteWithdrawalBankAccount = payload => ({
  payload,
  type: cx.DELETE_WITHDRAWAL_BANK_ACCOUNT,
});
