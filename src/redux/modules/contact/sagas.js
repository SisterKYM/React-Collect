import {put, takeEvery} from 'redux-saga/effects';

import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {request} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const sendContactMessage = request({
  method: apiClient.post,
  onFailure: function* onFailure() {
    yield put(
      errorAlert({
        body: 'An error happened while sending your message. Please try again.',
        title: 'Sorry!',
      })
    );
  },
  onSuccess: function* onSuccess() {
    yield put(
      successAlert({
        body: 'Your message was sent successfully',
        title: 'Thank you!',
      })
    );
  },
  path: () => 'contact',
  success: ({data}) => data,
  type: cx.SEND_CONTACT_MESSAGE,
});

export default function* rootSaga() {
  yield takeEvery(cx.SEND_CONTACT_MESSAGE, sendContactMessage);
}
