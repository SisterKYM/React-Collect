import {FaBan} from 'react-icons/fa';
import {call, delay, put} from 'redux-saga/effects';
import {get} from 'lodash';
import {push} from 'connected-react-router';

import * as cx from 'redux/modules/collections/constants';
import {errorAlert} from 'redux/modules/growl/actions';
import {normalizeCollections} from 'redux/modules/collections/helpers';
import {report, success} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';
import {readApiError} from 'helpers/apiResponseHelpers';

export default function* updateCollection(action) {
  try {
    const id = get(action, 'payload.id');

    if (!id) {
      return;
    }

    yield report.pending(cx.UPDATE_COLLECTION);
    const {imageId, metadata, ...payload} = action.payload;

    yield call(apiClient.put, `users/tabs/${id}`, payload);

    yield delay(1);

    const {data: collections} = yield call(apiClient.get, `users/tabs`);
    const {data: folders} = yield call(apiClient.get, `users/folders`);
    yield put({
      type: success(cx.UPDATE_COLLECTION),
      payload: {
        ...normalizeCollections(collections, folders),
      },
    });
    yield report.success(cx.UPDATE_COLLECTION);

    if (get(metadata, 'successRedirect')) {
      yield put(push(metadata.successRedirect));
    }
  } catch (err) {
    const errorMessage = readApiError(err, {
      slug_taken: 'The domain you requested has been taken.',
    });

    const alert = {
      title: 'Error',
      body: errorMessage,
      icon: FaBan,
    };

    yield put(errorAlert(alert));

    yield report.failure(cx.UPDATE_COLLECTION);
    yield report.error(cx.UPDATE_COLLECTION, err);
  }
}
