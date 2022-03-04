import {takeLatest, call, put} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

function* getThemes() {
  try {
    yield async.report.pending(cx.GET_THEMES);
    const res = yield call(apiClient.get, 'users/themes');
    yield put({
      type: async.success(cx.GET_THEMES),
      payload: {themes: res.data},
    });
    yield async.report.success(cx.GET_THEMES);
  } catch (err) {
    yield async.report.failure(cx.GET_THEMES);
    yield async.report.error(cx.GET_THEMES, err);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.GET_THEMES, getThemes);
}
