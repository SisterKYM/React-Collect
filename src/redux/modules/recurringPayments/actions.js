import * as cx from './constants';

export const cancelRecurringPayment = payload => ({
  payload,
  type: cx.CANCEL_RECURRING_PAYMENT,
});

export const getRecurringPayments = payload => ({
  payload,
  type: cx.GET_RECURRING_PAYMENTS,
});

export const retryFailedInvoice = payload => ({
  payload,
  type: cx.RETRY_FAILED_INVOICE,
});

export const updatePaymentSource = payload => ({
  payload,
  type: cx.UPDATE_PAYMENT_SOURCE,
});
