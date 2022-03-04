import {takeLatest} from 'redux-saga/effects';

import {request} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const getCategories = request({
  type: cx.GET_CATEGORIES,
  path: action => `users/tabs/${action.payload.collection}/categories`,
  method: apiClient.get,
  success: res => ({categories: res.data}),
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_CATEGORIES, getCategories);
}
