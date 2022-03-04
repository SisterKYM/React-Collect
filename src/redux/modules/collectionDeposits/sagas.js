import {call, put, takeLatest} from 'redux-saga/effects';

import * as async from 'redux/modules/async/helpers';
import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {promiseStripeToken} from 'redux/modules/stripe/helpers';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';

const getCollectionDeposits = async.request({
  type: cx.GET_COLLECTION_DEPOSITS,
  path: action => `users/tabs/${action.payload.collection}/deposits`,
  method: apiClient.get,
  success: ({data: collectionDeposits}) => ({collectionDeposits}),
});

function* createCollectionDeposit(action) {
  try {
    yield async.report.pending(cx.CREATE_COLLECTION_DEPOSIT);
    const {
      tabId,
      bankAccountId,
      accountNumber,
      routingNumber,
      amount_cents,
      idempotency_key,
    } = action.payload;

    let paymentSourceId = bankAccountId;

    if (!paymentSourceId) {
      const stripeRes = yield promiseStripeToken(
        {
          country: 'US',
          currency: 'usd',
          account_number: accountNumber,
          routing_number: routingNumber,
          account_holder_name: '',
        },
        'bank_account'
      );

      if (stripeRes.error) {
        yield async.report.failure(cx.CREATE_COLLECTION_DEPOSIT);
        yield put(
          errorAlert({
            title: 'Error',
            body: stripeRes.error.message,
          })
        );
        yield async.report.error(cx.CREATE_COLLECTION_DEPOSIT, stripeRes.error);
      } else if (stripeRes.token) {
        const res = yield call(apiClient.post, 'users/payment_methods', {
          nickname: '',
          source: stripeRes.token.id,
        });

        paymentSourceId = res.data.id;
      }
    }

    yield call(apiClient.post, `users/tabs/${tabId}/deposits`, {
      amount_cents,
      idempotency_key,
      stripe_payment_source_id: paymentSourceId,
    });

    const {data: collection} = yield call(apiClient.get, `users/tabs/${tabId}`);

    yield put(
      successAlert({
        title: 'Success',
        body: 'Collection has been funded',
      })
    );
    yield put({
      type: async.success(cx.CREATE_COLLECTION_DEPOSIT),
      payload: {
        collection,
      },
    });
    yield async.report.success(cx.CREATE_COLLECTION_DEPOSIT);
  } catch (err) {
    yield put(
      errorAlert({
        title: 'Error',
        body:
          (err.response && err.response.data && err.response.data.error) ||
          err.message,
      })
    );

    yield async.report.failure(cx.CREATE_COLLECTION_DEPOSIT);
    yield async.report.error(cx.CREATE_COLLECTION_DEPOSIT, err);
  }
}

function* rootSaga() {
  yield takeLatest(cx.GET_COLLECTION_DEPOSITS, getCollectionDeposits);
  yield takeLatest(cx.CREATE_COLLECTION_DEPOSIT, createCollectionDeposit);
}

export default rootSaga;
