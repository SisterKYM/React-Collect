import {takeLatest, call, put} from 'redux-saga/effects';
import {uniqBy, get, set, sortBy} from 'lodash';

import * as cx from 'redux/modules/sellersForms/constants';
import {GET_FORMS} from 'redux/modules/forms/constants';
import {normalizeGetFieldsResponse} from 'redux/modules/fields/helpers';
import {request, report, success} from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

const getSellerForm = request({
  type: cx.GET_SELLER_FORM,
  method: apiClient.get,
  path: action => `users/form_templates/${action.payload.form}`,
  success: res => {
    const form = res.data;
    const seller = {
      id: form.user.id,
      name: form.user.name,
    };

    const subformFields = get(form, 'active_forms[0].fields', []);
    const subformFieldsSorted = normalizeGetFieldsResponse(
      sortBy(subformFields, f => f.position)
    );
    set(form, 'active_forms[0].fields', subformFieldsSorted);

    return {
      form,
      seller,
    };
  },
});

const getSellersForms = request({
  type: cx.GET_SELLERS_FORMS,
  method: apiClient.get,
  path: 'users/form_templates',
  success: res => {
    const forms = res.data;
    const sellers = forms.map(catalog => ({
      id: catalog.user.id,
      name: catalog.user.name,
    }));

    return {
      forms,
      sellers: uniqBy(sellers, 'id'),
    };
  },
});

function* addSellerFormToCollection(action) {
  try {
    yield report.pending(cx.ADD_SELLER_FORM_TO_COLLECTION);

    const {collection, form, subform} = action.payload;
    yield call(apiClient.post, `users/tabs/${collection}/catalog/add`, {
      catalog: {id: form, forms: [subform]},
    });

    const res = yield call(apiClient.get, `users/tabs/${collection}/forms`);
    yield put({type: success(GET_FORMS), payload: {forms: res.data}});

    yield put({type: success(cx.ADD_SELLER_FORM_TO_COLLECTION)});
    yield report.success(cx.ADD_SELLER_FORM_TO_COLLECTION);
  } catch (err) {
    yield report.failure(cx.ADD_SELLER_FORM_TO_COLLECTION);
    yield report.error(cx.ADD_SELLER_FORM_TO_COLLECTION, err);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.GET_SELLER_FORM, getSellerForm);
  yield takeLatest(cx.GET_SELLERS_FORMS, getSellersForms);
  yield takeLatest(cx.ADD_SELLER_FORM_TO_COLLECTION, addSellerFormToCollection);
}
