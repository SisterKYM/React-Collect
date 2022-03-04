import {takeLatest} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import * as cx from 'redux/modules/withdrawals/constants';
import apiClient from 'helpers/apiClient';

const getWithdrawals = async.request({
  type: cx.GET_WITHDRAWALS,
  method: apiClient.get,
  path: action => `users/tabs/${action.payload.collection}/withdrawals`,
  success: res => res.data,
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_WITHDRAWALS, getWithdrawals);
}
