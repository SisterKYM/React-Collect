import * as cx from 'redux/modules/paymentAccounts/constants';

export const getPaymentAccounts = payload => ({
  payload,
  type: cx.GET_PAYMENT_ACCOUNTS,
});
