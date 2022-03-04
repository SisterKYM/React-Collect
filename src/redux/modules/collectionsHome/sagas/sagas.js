import {takeLatest} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import * as cx from 'redux/modules/collectionsHome/constants';
import apiClient from 'helpers/apiClient';

const getCollections = async.request({
  method: apiClient.get,
  path: action => `collections/${action.payload.slug}/home`,
  success: res => res.data,
  type: cx.GET_COLLECTIONS,
});

export default function* rootSaga() {
  yield takeLatest(cx.GET_COLLECTIONS, getCollections);
}
