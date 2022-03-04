import {FaBan} from 'react-icons/fa';
import {takeLatest, call, put} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import * as cx from 'redux/modules/collections/constants';
import {errorAlert} from 'redux/modules/growl/actions';
import {normalizeCollections} from 'redux/modules/collections/helpers';
import apiClient from 'helpers/apiClient';

import updateCollection from './updateCollection';

const getAttachments = async.request({
  method: apiClient.get,
  path: (action) => `users/tabs/${action.payload.collection}/attachments`,
  success: (res) => res.data,
  type: cx.GET_ATTACHMENTS,
});

function* addAttachment(action) {
  try {
    yield async.report.pending(cx.ADD_ATTACHMENT);
    const {collection, file} = action.payload;
    const formData = new window.FormData();
    formData.append('file_name', file);
    yield call(
      apiClient.post,
      `users/tabs/${collection}/attachments`,
      formData
    );
    yield getAttachments(action);
    yield async.report.success(cx.ADD_ATTACHMENT);
  } catch (err) {
    yield async.report.failure(cx.ADD_ATTACHMENT);
    yield async.report.error(cx.ADD_ATTACHMENT, err);
  }
}

const deleteAttachment = async.request({
  method: apiClient.delete,
  onSuccess: (action) => getAttachments(action),
  path: (action) =>
    `users/tabs/${action.payload.collection}/attachments/${action.payload.attachment}`,
  type: cx.DELETE_ATTACHMENT,
});

const getCollection = async.request({
  type: cx.GET_COLLECTION,
  method: apiClient.get,
  path: (action) => `users/tabs/${action.payload.collection}`,
  success: (res) => ({collection: res.data}),
});

function* getCollections() {
  try {
    yield async.report.pending(cx.GET_COLLECTIONS);
    const {data: collections} = yield call(apiClient.get, `users/tabs`);
    const {data: folders} = yield call(apiClient.get, `users/folders`);

    yield put({
      type: async.success(cx.GET_COLLECTIONS),
      payload: {
        ...normalizeCollections(collections, folders),
      },
    });
    yield async.report.success(cx.GET_COLLECTIONS);
  } catch (err) {
    yield async.report.failure(cx.GET_COLLECTIONS);
    yield async.report.error(cx.GET_COLLECTIONS, err);
  }
}

function* deleteCollection(action) {
  try {
    yield async.report.pending(cx.DELETE_COLLECTION);
    yield call(apiClient.delete, `users/tabs/${action.payload.collection}`);
    yield put({
      type: async.success(cx.DELETE_COLLECTION),
      payload: {collectionId: action.payload.collection},
    });
    yield async.report.success(cx.DELETE_COLLECTION);
  } catch (err) {
    yield put(
      errorAlert({
        title: 'Error',
        body:
          'You must withdraw all available and pending balances prior to deleting a tab',
        icon: FaBan,
      })
    );
    yield async.report.failure(cx.DELETE_COLLECTION);
    yield async.report.error(cx.DELETE_COLLECTION, err);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.ADD_ATTACHMENT, addAttachment);
  yield takeLatest(cx.GET_COLLECTION, getCollection);
  yield takeLatest(cx.GET_ATTACHMENTS, getAttachments);
  yield takeLatest(cx.GET_COLLECTIONS, getCollections);
  yield takeLatest(cx.DELETE_ATTACHMENT, deleteAttachment);
  yield takeLatest(cx.DELETE_COLLECTION, deleteCollection);
  yield takeLatest(cx.UPDATE_COLLECTION, updateCollection);
}
