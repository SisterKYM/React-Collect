import {call, put, takeLatest, select} from 'redux-saga/effects';
import {get, identity, pickBy, reject, toPairs} from 'lodash';

import * as async from 'redux/modules/async/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const normalizeOrgMembers = ({data: {pagination, search, data = []}}) => ({
  pagination,
  search,
  orgMembers: data,
});

const getOrgMembers = async.request({
  type: cx.GET_ORG_MEMBERS,
  method: apiClient.get,
  path: action => {
    const query = pickBy(get(action, 'payload.query'), identity);

    const queryString = toPairs(query)
      .map(q => q.join('='))
      .join('&');

    return `users/org_members?${queryString}`;
  },
  success: normalizeOrgMembers,
});

function* removeOrgMember(action) {
  try {
    yield async.report.pending(cx.REMOVE_ORG_MEMBER);

    yield call(apiClient.delete, `/users/org_members/${action.payload.id}`);

    const orgMembersState = yield select(state => state.orgMembers);

    yield put({
      payload: {
        pagination: orgMembersState.pagination,
        orgMembers: reject(orgMembersState.orgMembers, {
          id: action.payload.id,
        }),
      },
      type: async.success(cx.REMOVE_ORG_MEMBER),
    });

    yield async.report.success(cx.REMOVE_ORG_MEMBER);
  } catch (err) {
    yield async.report.failure(cx.REMOVE_ORG_MEMBER);
    yield async.report.error(cx.REMOVE_ORG_MEMBER, err);
  }
}

function* rootSaga() {
  yield takeLatest(cx.GET_ORG_MEMBERS, getOrgMembers);
  yield takeLatest(cx.REMOVE_ORG_MEMBER, removeOrgMember);
}

export default rootSaga;
