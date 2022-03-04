import {get, keys} from 'lodash';

import {GET_BANK_ACCOUNTS} from 'redux/modules/bankAccounts/constants';
import {getBankAccounts} from 'redux/modules/bankAccounts/actions';

const connector = props => {
  if (!props) {
    return [];
  }
  const state = props.store.getState();
  const bankAccounts = get(state, 'bankAccounts.bankAccounts.banks', {});
  const ks = keys(bankAccounts);

  return ks.length !== 0
    ? []
    : [
        {
          key: GET_BANK_ACCOUNTS,
          promise: getBankAccounts,
        },
      ];
};

export default connector;
