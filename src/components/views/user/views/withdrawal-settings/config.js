import {deleteWithdrawalBankAccount} from 'redux/modules/bankAccounts/actions';
import {requestVerificationCode} from 'redux/modules/session/actions';

import {onBankAccountDelete, onBankAccountFormSubmit} from './lib';

export const ACTIONS = {
  deleteWithdrawalBankAccount,
  requestVerificationCode,
};

export const HANDLERS = {
  onBankAccountDelete,
  onBankAccountFormSubmit,
  onAddAccountFormClose: props => () => {
    props.toggleAddAccount(false);
  },
  showAddAccountForm: props => () => {
    props.toggleAddAccount(true);
  },
};
