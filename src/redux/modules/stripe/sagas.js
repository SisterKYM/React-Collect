import {EventTypes} from 'redux-segment';
import {get} from 'lodash';
import {push} from 'connected-react-router';
import {takeLatest, call, put, select} from 'redux-saga/effects';

import * as cx from 'redux/modules/stripe/constants';
import {SESSION} from 'redux/modules/session/constants';
import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import {getCollection} from 'redux/modules/collections/actions';
import {getItems} from 'redux/modules/items/actions';
import {getSession} from 'redux/modules/session/actions';
import {request, report, success} from 'redux/modules/async/helpers';
import {storage} from 'helpers';
import apiClient from 'helpers/apiClient';

const checkSubscription = request({
  method: apiClient.patch,
  type: cx.CHECK_SUBSCRIPTION,
  path: () => 'users/subscription/check',
  success: (res) => ({
    checkResults: res.data,
  }),
});

function* updateSubscription(action) {
  try {
    yield report.pending(cx.UPDATE_SUBSCRIPTION);
    const {
      metadata,
      createToken,
      paymentMethodId,
      plan,
      coupon,
    } = action.payload;
    let paymentMethod = null;

    if (!paymentMethodId && createToken) {
      const createTokenRes = yield call(createToken);

      if (createTokenRes.error) {
        errorAlert({
          body: createTokenRes.error.message,
          title: 'Upgrade error',
        });

        throw new Error(createTokenRes.error.message);
      }

      const {data: createdPaymentMethod} = yield call(
        apiClient.post,
        'users/payment_methods',
        {
          source: createTokenRes.token.id,
        }
      );
      paymentMethod = createdPaymentMethod;
    }

    const {data: newPlan} = yield call(apiClient.patch, 'users/subscription', {
      plan,
      coupon,
      source_id:
        paymentMethodId || (paymentMethod ? paymentMethod.id : undefined),
    });

    storage.clear(SESSION);
    yield put(getSession());

    const collection = yield select((state) => state.collections.collection);

    if (collection && collection.id) {
      yield put(getCollection({collection: collection.id}));
    }

    const {data: subscriptionGot} = yield call(
      apiClient.get,
      'users/subscription'
    );
    yield put({
      payload: {
        plan: subscriptionGot.plan,
        paymentMethod: subscriptionGot.payment_method,
      },
      type: success(cx.UPDATE_SUBSCRIPTION),
      meta: {
        googleTagManager: {
          event: 'USER_SUBSCRIPTION_CHANGE',
        },
        analytics: {
          eventType: EventTypes.track,
          eventPayload: {
            event: 'USER_SUBSCRIPTION_CHANGE',
            plan: newPlan.newPlan,
          },
        },
      },
    });

    yield report.success(cx.UPDATE_SUBSCRIPTION);

    const collectionsState = yield select((state) => state.collections);

    yield put(
      getCollection({
        collection: get(collectionsState, 'collection.id'),
      })
    );

    if (collectionsState.collection) {
      yield put(getItems({collection: collectionsState.collection.id}));
    }

    let alert;
    switch (plan) {
      case 'no_change':
        alert = successAlert({
          body: 'Your payment method was successfully updated',
          title: 'Success',
        });
        break;
      case 'free':
        alert = successAlert({
          body: "You've been downgraded",
          title: 'Back to Basics',
        });
        break;
      default: {
        alert = successAlert({
          title: 'Success',
          body: `Your account was successfully changed to ${newPlan.newPlan}`,
        });
        break;
      }
    }
    yield put(clearAlerts());
    if (get(metadata, 'successRedirect')) {
      yield put(push(metadata.successRedirect));
    }
    yield put(alert);
  } catch (err) {
    let errMsg;
    switch (err.code) {
      case 'invalid_number':
      case 'incorrect_number':
      case 'invalid_expiry_year':
        errMsg = err.message;
        break;
      default:
        errMsg = null;
    }

    if (
      !errMsg &&
      err.response &&
      err.response.data &&
      err.response.data.error
    ) {
      errMsg = err.response.data.error;
    }

    if (errMsg === 'tabs_have_balances') {
      errMsg = 'You must withdraw your balance prior to downgrading';
    }

    if (errMsg) {
      yield put(
        errorAlert({
          title: 'Error',
          body: errMsg,
        })
      );
    }

    yield report.failure(cx.UPDATE_SUBSCRIPTION);
    yield report.error(cx.UPDATE_SUBSCRIPTION, errMsg);
  }
}

export default function* rootSaga() {
  yield takeLatest(cx.CHECK_SUBSCRIPTION, checkSubscription);
  yield takeLatest(cx.UPDATE_SUBSCRIPTION, updateSubscription);
}
