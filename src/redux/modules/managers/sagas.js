import {FaCheck, FaCheckCircle, FaExclamationCircle} from 'react-icons/fa';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {get} from 'lodash';

import * as async from 'redux/modules/async/helpers';
import * as cx from 'redux/modules/managers/constants';
import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import apiClient from 'helpers/apiClient';

const deleteManager = async.request({
  method: apiClient.post,
  path: action => `/users/managers/${action.payload.manager}/delete`,
  success: res => res.data,
  type: cx.DELETE_MANAGER,
});

const remindManager = async.request({
  method: apiClient.post,
  path: action => `/users/managers/${action.payload.manager}/remind`,
  success: res => res.data,
  type: cx.REMIND_MANAGER,
  *onSuccess(action, data) {
    const alert = successAlert({
      title: 'Success!',
      body: `Invitation re-sent to: ${data.invited_email}`,
      icon: FaCheck,
    });
    yield put(alert);
  },
});

const getManagers = async.request({
  method: apiClient.get,
  path: '/users/managers',
  success: res => res.data,
  type: cx.GET_MANAGERS,
});

function* inviteManager(action) {
  try {
    yield async.report.pending(cx.INVITE_MANAGER);
    const {email, firstName, lastName, accessScope} = action.payload;

    yield call(apiClient.post, `/users/managers`, {
      invited_email: email,
      name: `${firstName} ${lastName}`,
      access_scope: accessScope,
    });
    const {data: managers} = yield call(apiClient.get, `/users/managers`);
    yield put({
      payload: managers,
      type: async.success(cx.INVITE_MANAGER),
    });

    yield put(clearAlerts());
    yield put(
      successAlert({
        title: 'Invite sent!',
        body: `Manager invite sent to ${email}`,
        icon: FaCheckCircle,
      })
    );
    yield async.report.success(cx.INVITE_MANAGER);
  } catch (err) {
    const data = get(err, 'response.data', null);
    yield put(clearAlerts());
    yield put(
      errorAlert({
        title: 'Sorry!',
        body: `Manager with email ${data.invited_email} is already invited. Please try another email.`,
        icon: FaExclamationCircle,
      })
    );
    yield async.report.failure(cx.INVITE_MANAGER);
    yield async.report.error(cx.INVITE_MANAGER, err);
  }
}

const updateManager = async.request({
  method: apiClient.patch,
  path: action => `/users/managers/${action.payload.manager}`,
  success: res => res.data,
  type: cx.UPDATE_MANAGER,
});

export default function* rootSaga() {
  yield takeEvery(cx.DELETE_MANAGER, deleteManager);
  yield takeLatest(cx.REMIND_MANAGER, remindManager);
  yield takeLatest(cx.GET_MANAGERS, getManagers);
  yield takeLatest(cx.INVITE_MANAGER, inviteManager);
  yield takeEvery(cx.UPDATE_MANAGER, updateManager);
}
