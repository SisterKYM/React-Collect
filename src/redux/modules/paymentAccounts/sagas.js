import {takeLatest} from 'redux-saga/effects';

import * as cx from 'redux/modules/paymentAccounts/constants';
import {request} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

const getPaymentAccounts = request({
  type: cx.GET_PAYMENT_ACCOUNTS,
  method: apiClient.get,
  path: 'users/payment_methods',
  success: ({data: paymentAccounts}) => ({paymentAccounts}),
});

function* rootSaga() {
  yield takeLatest(cx.GET_PAYMENT_ACCOUNTS, getPaymentAccounts);
}

export default rootSaga;
