import {get} from 'lodash';
import {put, takeLatest} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import {SESSION} from 'redux/modules/session/constants';
import {errorAlert} from 'redux/modules/growl/actions';
import {getCollections} from 'redux/modules/collections/actions';
import {storage} from 'helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const acceptInvitation = async.request({
  type: cx.ACCEPT_INVITATION,
  method: apiClient.post,
  path: ({payload}) => `/users/managers/${payload.manager_id}/accept_invite`,
  success: res => res.data,
  *onSuccess() {
    storage.clear(SESSION);
    yield put(getCollections());
  },
  onFailure: function* onFailure(response) {
    const errorMessage = get(response, 'data.errors[0].details.details');

    yield put(
      errorAlert({
        body: errorMessage || 'An error happened while accepting the invite.',
        title: 'Error',
      })
    );
  },
});

const getInvitation = async.request({
  type: cx.GET_INVITATION,
  method: apiClient.post,
  path: ({payload}) => `/users/managers/${payload.manager_id}/invitation`,
  success: res => res.data,
});

export default function* rootSaga() {
  yield takeLatest(cx.ACCEPT_INVITATION, acceptInvitation);
  yield takeLatest(cx.GET_INVITATION, getInvitation);
}
