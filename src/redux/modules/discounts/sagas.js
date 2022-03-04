import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {get} from 'lodash';

import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {request, success} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const getDiscounts = request({
  method: apiClient.get,
  path: action => `users/tabs/${action.payload.collection}/discounts`,
  success: ({data}) => data,
  type: cx.GET_DISCOUNTS,
});

const createDiscount = request({
  method: apiClient.post,
  onFailure: function* onFailure(err) {
    const errCode = get(err, 'data.errors.code', []);
    let errBody = '';
    switch (errCode[0]) {
      case 'has already been taken':
        errBody = `The code "${get(
          err,
          'data.code',
          ''
        )}" is already taken. Please use another one.`;
        break;
      default:
        errBody = 'Error happened. Please try again';
    }
    yield put(
      errorAlert({
        body: errBody,
        title: 'Sorry!',
      })
    );
  },
  onSuccess: function* onSuccess(action) {
    yield call(getDiscounts, action);
    yield put(
      successAlert({
        body: `Discount "${get(
          action,
          'payload.code',
          ''
        )}" was added successfully`,
        title: 'Success!',
      })
    );
  },
  path: action => `users/tabs/${action.payload.collection}/discounts`,
  type: cx.CREATE_DISCOUNT,
});

const deleteDiscount = request({
  method: apiClient.delete,
  onFailure: function* onFailure() {
    yield put(
      errorAlert({
        body: 'Discount deleting was failed',
        title: 'Sorry!',
      })
    );
  },
  onSuccess: function* onSuccess(action) {
    yield call(getDiscounts, action);
    yield put(
      successAlert({
        body: `Discount was deleted successfully`,
        title: 'Success!',
      })
    );
  },
  path: action => {
    const {collection, discount} = action.payload;

    return `users/tabs/${collection}/discounts/${discount}`;
  },
  type: cx.DELETE_DISCOUNT,
});

const switchDiscounts = request({
  method: apiClient.put,
  path: action => `users/tabs/${action.payload.collection}`,
  onSuccess: function* onSuccess(action, payload) {
    yield put({
      payload: {
        collection: payload,
      },
      type: success(GET_COLLECTION),
    });
  },
  success: ({data}) => data,
  type: cx.SWITCH_DISCOUNTS,
});

const updateDiscount = request({
  method: apiClient.patch,
  onFailure: function* onFailure(err) {
    yield call(errorAlert, {
      body: err,
      title: 'Sorry!',
    });
  },
  onSuccess: function* onSuccess(action) {
    yield call(getDiscounts, action);
    yield put(
      successAlert({
        body: `Discount "${get(
          action,
          'payload.code',
          ''
        )}" was updated successfully`,
        title: 'Success!',
      })
    );
  },
  path: action => {
    const {collection, discount} = action.payload;

    return `users/tabs/${collection}/discounts/${discount}`;
  },
  type: cx.UPDATE_DISCOUNT,
});

export default function* rootSaga() {
  yield takeLatest(cx.CREATE_DISCOUNT, createDiscount);
  yield takeEvery(cx.DELETE_DISCOUNT, deleteDiscount);
  yield takeLatest(cx.GET_DISCOUNTS, getDiscounts);
  yield takeLatest(cx.SWITCH_DISCOUNTS, switchDiscounts);
  yield takeLatest(cx.UPDATE_DISCOUNT, updateDiscount);
}
