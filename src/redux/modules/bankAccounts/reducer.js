import * as cx from 'redux/modules/bankAccounts/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  bankAccounts: {
    banks: [],
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_BANK_ACCOUNTS):
    case success(cx.DELETE_WITHDRAWAL_BANK_ACCOUNT):
      return {
        ...state,
        ...action.payload,
      };
    case success(cx.CREATE_WITHDRAWAL_BANK_ACCOUNT):
      return {
        ...state,
        bankAccounts: {
          ...state.bankAccounts,
          banks: [...state.bankAccounts.banks, action.payload.bankAccount],
        },
      };
    default:
      return state;
  }
};

export default reducer;
