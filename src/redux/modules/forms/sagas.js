import {FaBan, FaCheck} from 'react-icons/fa';
import {put, takeLatest, takeEvery, call} from 'redux-saga/effects';

import * as cx from 'redux/modules/forms/constants';
import {
  batchRequestHelper,
  normalizeGetFieldsResponse,
} from 'redux/modules/fields/helpers';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {success, request, report} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

const getForms = request({
  type: cx.GET_FORMS,
  path: action => `users/tabs/${action.payload.collection}/forms/search`,
  method: apiClient.get,
  success: res => ({
    forms: res.data.data,
    search: res.data.search,
    sorted: {
      sort: res.data.sort,
    },
    pagination: res.data.pagination,
  }),
});

const sortForms = request({
  type: cx.SORT_FORMS,
  path: action => `users/tabs/${action.payload.collection}/sort`,
  method: apiClient.patch,
});

function* getForm(action) {
  try {
    yield report.pending(cx.GET_FORM);
    const formUrl = `users/tabs/${action.payload.collection}/forms/${action.payload.form}`;
    const {data: form} = yield call(apiClient.get, formUrl);
    const {data: fields} = yield call(apiClient.get, `${formUrl}/fields`);
    yield put({
      type: success(cx.CREATE_FORM),
      payload: {
        form,
        fields: normalizeGetFieldsResponse(fields),
      },
    });
    yield report.success(cx.GET_FORM);
  } catch (err) {
    yield report.failure(cx.GET_FORM);
    yield report.error(cx.GET_FORM, err);
  }
}

function* deleteForm(action) {
  try {
    yield report.pending(cx.DELETE_FORM);
    yield call(
      apiClient.delete,
      `users/tabs/${action.payload.collection}/forms/${action.payload.form}`
    );
    const {data: forms} = yield call(
      apiClient.get,
      `users/tabs/${action.payload.collection}/forms`
    );
    yield put(
      successAlert({
        title: 'Success',
        body: 'Your form was successfully deleted',
        icon: FaCheck,
      })
    );
    yield put({
      type: success(cx.DELETE_FORM),
      payload: {forms},
    });
    yield report.success(cx.DELETE_FORM);
  } catch (err) {
    yield put(
      errorAlert({
        title: 'Error',
        body:
          'Something went wrong while trying to delete your form. Please try again.',
        icon: FaBan,
      })
    );
    yield report.failure(cx.DELETE_FORM);
    yield report.error(cx.DELETE_FORM, err);
  }
}

function* updateForm(action) {
  try {
    yield report.pending(cx.UPDATE_FORM);
    const {collection, fields, ...payload} = action.payload;
    const {data: form} = yield call(
      apiClient.patch,
      `users/tabs/${collection}/forms/${payload.form.id}`,
      payload.form
    );

    if (fields && fields.length !== 0) {
      const newFields = fields.filter(
        field => String(field.id).startsWith('local') && !field.delete
      );
      const deletedFields = fields.filter(
        field => !String(field.id).startsWith('local') && field.delete
      );
      const updatedFields = fields.filter(
        field => !String(field.id).startsWith('local') && !field.delete
      );
      if (newFields.length !== 0) {
        yield call(
          apiClient.patch,
          'batch',
          batchRequestHelper(
            newFields,
            'post',
            `api/users/tabs/${collection}/forms/${form.id}/fields`
          )
        );
      }
      if (updatedFields.length !== 0) {
        yield call(
          apiClient.patch,
          'batch',
          batchRequestHelper(
            updatedFields,
            'patch',
            field =>
              `api/users/tabs/${collection}/forms/${form.id}/fields/${field.id}`
          )
        );
      }
      if (deletedFields.length !== 0) {
        yield call(
          apiClient.patch,
          'batch',
          batchRequestHelper(
            deletedFields,
            'delete',
            field =>
              `api/users/tabs/${collection}/forms/${form.id}/fields/${field.id}`
          )
        );
      }
    }

    const {data: forms} = yield call(
      apiClient.get,
      `users/tabs/${collection}/forms`
    );

    yield put({
      type: success(cx.UPDATE_FORM),
      payload: {forms, form},
    });

    yield report.success(cx.UPDATE_FORM);
  } catch (err) {
    yield report.failure(cx.UPDATE_FORM);
    yield report.error(cx.UPDATE_FORM, err);
  }
}

function* createForm(action) {
  try {
    yield report.pending(cx.CREATE_FORM);
    const {collection, fields, ...payload} = action.payload;

    const {data: form} = yield call(
      apiClient.post,
      `users/tabs/${collection}/forms`,
      payload.form
    );

    if (fields.length !== 0) {
      yield call(
        apiClient.patch,
        'batch',
        batchRequestHelper(
          fields,
          'post',
          `api/users/tabs/${collection}/forms/${form.id}/fields`
        )
      );
    }

    const {data: forms} = yield call(
      apiClient.get,
      `users/tabs/${collection}/forms`
    );

    yield put({
      type: success(cx.CREATE_FORM),
      payload: {forms, form},
    });

    yield report.success(cx.CREATE_FORM);
  } catch (err) {
    yield report.failure(cx.CREATE_FORM);
    yield report.error(cx.CREATE_FORM, err);
  }
}

function* createWaiver(action) {
  try {
    yield report.pending(cx.CREATE_WAIVER);
    const {collection, ...payload} = action.payload;

    const {data: form} = yield call(
      apiClient.post,
      `users/tabs/${collection}/forms`,
      {
        ...payload,
        options: {
          isWaiver: true,
        },
      }
    );

    const {data: forms} = yield call(
      apiClient.get,
      `users/tabs/${collection}/forms`
    );

    yield put({
      type: success(cx.CREATE_WAIVER),
      payload: {forms, form},
    });

    yield report.success(cx.CREATE_WAIVER);
  } catch (err) {
    yield report.failure(cx.CREATE_WAIVER);
    yield report.error(cx.CREATE_WAIVER, err);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.GET_FORM, getForm);
  yield takeLatest(cx.GET_FORMS, getForms);
  yield takeLatest(cx.DELETE_FORM, deleteForm);
  yield takeLatest(cx.UPDATE_FORM, updateForm);
  yield takeLatest(cx.CREATE_FORM, createForm);
  yield takeLatest(cx.CREATE_WAIVER, createWaiver);
  yield takeEvery(cx.SORT_FORMS, sortForms);
}
