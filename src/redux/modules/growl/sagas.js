import {delay, put, takeLatest} from 'redux-saga/effects';
import _ from 'lodash';

import * as cx from './constants';
import {clearAlerts} from './actions';

function* successAlert(action) {
  yield delay(3000);

  const stay = Boolean(_.get(action, 'payload.stay', false));

  if (!stay) {
    yield put(clearAlerts());
  }
}

function* rootSaga() {
  yield takeLatest(cx.SUCCESS_ALERT, successAlert);
}

export default rootSaga;
