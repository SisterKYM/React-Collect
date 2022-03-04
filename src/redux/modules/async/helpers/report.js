import {put} from 'redux-saga/effects';

import * as cx from 'redux/modules/async/constants';

import {setStatus} from '../actions';

const getStatus = (type, status, metadata = {}) =>
  put(setStatus(type, status, metadata));

const report = {
  success: (type, metadata = {}) => getStatus(type, 'success', metadata),
  pending: (type, metadata = {}) => getStatus(type, 'pending', metadata),
  failure: (type, metadata = {}) => getStatus(type, 'failure', metadata),
  error: (type, error, metadata = {}) =>
    put({type: cx.ERROR, payload: {type, error, metadata}}),
};

export default report;
