import {takeLatest, call, put} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

function* createItemFieldValue(action) {
  try {
    const {
      id,
      collectionId,
      objectType,
      objectId,
      paymentItemId,
      paymentId,
      value,
    } = action.payload;

    yield async.report.pending(cx.CREATE_ITEM_FIELD_VALUE);
    const results = yield call(apiClient.batch, [
      {
        method: 'post',
        url: `api/users/tabs/${collectionId}/payments/${paymentId}/item_field_values`,
        params: {
          value,
          payment_id: paymentId,
          payment_item_id: paymentItemId,
          tab_object_id: objectId,
          item_field_id: id,
        },
      },
      {
        method: 'get',
        url: `api/users/tabs/${collectionId}/${objectType}s/${objectId}`,
      },
      {
        method: 'get',
        url: `api/users/tabs/${collectionId}/${objectType}s/${objectId}/fields`,
      },
      {
        method: 'get',
        url: `api/users/tabs/${collectionId}/payments/${paymentId}`,
      },
    ]);
    yield put({
      type: async.success(cx.CREATE_ITEM_FIELD_VALUE),
      payload: {
        [objectType]: results[1],
        fields: results[2],
        payment: results[3],
      },
    });

    yield async.report.success(cx.CREATE_ITEM_FIELD_VALUE);
  } catch (err) {
    yield async.report.failure(cx.CREATE_ITEM_FIELD_VALUE);
    yield async.report.error(cx.CREATE_ITEM_FIELD_VALUE, err);
  }
}

function* updateItemFieldValue(action) {
  try {
    const {
      collectionId,
      objectType,
      itemFieldValueId,
      objectId,
      paymentId,
      value,
    } = action.payload;

    yield async.report.pending(cx.UPDATE_ITEM_FIELD_VALUE);
    const results = yield call(apiClient.batch, [
      {
        method: 'patch',
        url: `api/users/tabs/${collectionId}/payments/${paymentId}/item_field_values/${itemFieldValueId}`,
        params: {item_field_value: {value}},
      },
      {
        method: 'get',
        url: `api/users/tabs/${collectionId}/${objectType}s/${objectId}`,
      },
      {
        method: 'get',
        url: `api/users/tabs/${collectionId}/${objectType}s/${objectId}/fields`,
      },
      {
        method: 'get',
        url: `api/users/tabs/${collectionId}/payments/${paymentId}`,
      },
    ]);
    yield put({
      type: async.success(cx.UPDATE_ITEM_FIELD_VALUE),
      payload: {
        [objectType]: results[1],
        fields: results[2],
        payment: results[3],
      },
    });

    yield async.report.success(cx.UPDATE_ITEM_FIELD_VALUE);
  } catch (err) {
    yield async.report.failure(cx.UPDATE_ITEM_FIELD_VALUE);
    yield async.report.error(cx.UPDATE_ITEM_FIELD_VALUE, err);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.CREATE_ITEM_FIELD_VALUE, createItemFieldValue);
  yield takeLatest(cx.UPDATE_ITEM_FIELD_VALUE, updateItemFieldValue);
}
