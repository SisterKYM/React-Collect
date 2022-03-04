import {success} from 'redux/modules/async/helpers';

import * as cx from './constants';
import {
  mapCancelRecurringPaymentsSuccess,
  mapUpdatePaymentSourceSuccess,
} from './lib';

const initialState = {
  recurringPayments: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.CANCEL_RECURRING_PAYMENT):
      return mapCancelRecurringPaymentsSuccess(state, action);
    case success(cx.GET_RECURRING_PAYMENTS):
      return {
        ...state,
        recurringPayments: action.payload,
      };
    case success(cx.UPDATE_PAYMENT_SOURCE):
      return mapUpdatePaymentSourceSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
