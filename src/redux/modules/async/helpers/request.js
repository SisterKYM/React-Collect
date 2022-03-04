import {call, put} from 'redux-saga/effects';
import {get, defaultTo} from 'lodash';
import {push} from 'connected-react-router';

import * as async from 'redux/modules/async/helpers';
import {storage} from 'helpers';
import apiClient from 'helpers/apiClient';
import config from 'config';

const request = ({
  payloadAsMetaOnPending,
  type: typeDef,
  method,
  path,
  onSuccess,
  onFailure,
  success,
  cache,
  cacheKey,
  failure,
  successRedirect,
  transformPayload,
  successMeta,
}) =>
  // eslint-disable-next-line func-names
  function*(action) {
    const type = typeof typeDef === 'function' ? typeDef(action) : typeDef;
    try {
      yield async.report.pending(
        type,
        payloadAsMetaOnPending ? action.payload : null
      );
      yield put({type: async.pending(type)});

      let key = type;
      if (cacheKey) {
        key = typeof cacheKey === 'function' ? cacheKey(action) : cacheKey;
        key += `-${config.clientId}`;
      }
      let payload = cache && storage.get(key);

      if (!payload) {
        const res = yield call(
          typeof method === 'string'
            ? apiClient[defaultTo(method, 'get')]
            : method,
          typeof path === 'function' ? path(action) : path,
          typeof transformPayload === 'function'
            ? yield transformPayload(action.payload)
            : action.payload
        );

        payload = success ? success(res) : res;

        if (cache) {
          storage.set(key, payload, cache);
        }
      }

      if (onSuccess) {
        yield onSuccess(action, payload);
      }
      const successEvent = {
        type: async.success(type),
        payload,
      };
      if (successMeta) {
        successEvent.meta = successMeta(payload);
      }
      yield put(successEvent);
      yield async.report.success(type, action.payload);
      const redirectPath = get(action, 'payload.metadata.successRedirect');
      if (successRedirect || redirectPath) {
        const location =
          redirectPath ||
          (typeof successRedirect === 'function'
            ? successRedirect(action)
            : successRedirect);
        yield put(push(location));
      }
    } catch (err) {
      const errRes = get(err, 'response', err);
      const errPayload = failure ? failure(errRes) : errRes;

      if (onFailure) {
        yield onFailure(errRes, errPayload);
      }

      yield put({
        type: async.failure(type),
        payload: errPayload,
      });

      yield async.report.error(type, errPayload, action.payload);
      yield async.report.failure(type, action.payload);
    }
  };

export default request;
