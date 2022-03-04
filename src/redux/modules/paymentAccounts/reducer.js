import * as cx from 'redux/modules/paymentAccounts/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  paymentAccounts: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_PAYMENT_ACCOUNTS):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
