import {get, orderBy} from 'lodash';
import {put, takeEvery, takeLatest} from 'redux-saga/effects';

import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {request} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const cancelRecurringPayment = request({
  method: apiClient.delete,
  onSuccess: function* onSuccess(action, payload) {
    yield put(
      successAlert({
        body: `Future recurring payments have been cancelled for: ${get(
          payload,
          'tab_item.name'
        )}`,
        title: 'Payments cancelled',
      })
    );
  },
  path: action => `users/recurring_payment_contracts/${action.payload.id}`,
  success: ({data}) => data,
  type: cx.CANCEL_RECURRING_PAYMENT,
});

const getRecurringPayments = request({
  method: apiClient.get,
  path: 'users/recurring_payment_contracts',
  success: ({data}) => ({
    ...data,
    contracts: orderBy(data.contracts, ['created_at'], ['desc']),
  }),
  type: cx.GET_RECURRING_PAYMENTS,
});

const retryFailedInvoice = request({
  method: apiClient.post,
  onFailure: function* onFailure() {
    yield put(
      errorAlert({
        body: 'Please update your payment method.',
        title: 'Payment Attempt Failed',
      })
    );
  },
  onSuccess: function* onSuccess() {
    yield put(
      successAlert({
        body: 'Check back in a few days to see if this payment is successful.',
        title: 'Payment Attempt Initiated',
      })
    );
  },
  path: action =>
    `users/recurring_payment_invoices/${action.payload.invoiceId}/retry`,
  success: ({data}) => data,
  type: cx.RETRY_FAILED_INVOICE,
});

const updatePaymentSource = request({
  method: apiClient.patch,
  onSuccess: function* onSuccess() {
    yield put(
      successAlert({
        body:
          'Your payment method for this automatic payment has been updated.',
        title: 'Payment method updated.',
      })
    );
  },
  path: action => `users/recurring_payment_contracts/${action.payload.id}`,
  payloadAsMetaOnPending: true,
  success: ({data}) => data,
  type: cx.UPDATE_PAYMENT_SOURCE,
});

export default function* rootSaga() {
  yield takeLatest(cx.CANCEL_RECURRING_PAYMENT, cancelRecurringPayment);
  yield takeLatest(cx.GET_RECURRING_PAYMENTS, getRecurringPayments);
  yield takeLatest(cx.RETRY_FAILED_INVOICE, retryFailedInvoice);
  yield takeEvery(cx.UPDATE_PAYMENT_SOURCE, updatePaymentSource);
}
