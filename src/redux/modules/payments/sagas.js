import {FaBan, FaCheck} from 'react-icons/fa';
import {get, toPairs} from 'lodash';
import {takeLatest, call, put} from 'redux-saga/effects';
import moment from 'moment';
import config from 'config';

import * as async from 'redux/modules/async/helpers';
import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import {currency} from 'helpers/numbers';
import {getCollection} from 'redux/modules/collections/actions';
import {getSession} from 'redux/modules/session/actions';
import apiClient from 'helpers/apiClient';

import * as cx from './constants';
import {getRefundableData as getRefundableDataAction} from './actions';

function* getPayment(action) {
  try {
    yield async.report.pending(cx.GET_PAYMENT);
    const {collection, payment: paymentId} = action.payload;
    const {data: payment} = yield call(
      apiClient.get,
      `users/tabs/${collection}/payments/${paymentId}`
    );
    yield put({type: async.success(cx.GET_PAYMENT), payload: {payment}});
    yield async.report.success(cx.GET_PAYMENT);
  } catch (err) {
    yield async.report.failure(cx.GET_PAYMENT);
    yield async.report.error(cx.GET_PAYMENT, err);
  }
}

const normalizePayments = (res) => {
  const {data} = res;
  const {pagination, sort, search} = data;
  const payments = get(data, 'data', []);

  return {
    pagination,
    payments: sort
      ? payments
      : [...payments].sort((a, b) =>
          moment(a.created_at).isSameOrBefore(b.created_at) ? 1 : -1
        ),
    sorted: {sort},
    search,
  };
};

const getPaymentsPath = (action) => {
  const collection = get(action, 'payload.collection');
  const baseUrl = `users/tabs/${collection}/payments`;
  const query = get(action, 'payload.query');
  const queryString = toPairs(query)
    .map((q) => q.join('='))
    .join('&');

  return `${baseUrl}?${queryString}`;
};

const getPayments = async.request({
  type: cx.GET_PAYMENTS,
  method: apiClient.get,
  path: getPaymentsPath,
  success: normalizePayments,
});

const getShippablePayments = async.request({
  type: cx.GET_SHIPPABLE_PAYMENTS,
  method: apiClient.get,
  path: getPaymentsPath,
  success: (res) => {
    const normalizedPayments = normalizePayments(res);

    return {
      shippablePayments: normalizedPayments,
    };
  },
});

const getPaymentShipment = async.request({
  type: cx.GET_PAYMENT_SHIPMENT,
  method: apiClient.get,
  path: ({payload}) =>
    `users/tabs/${payload.collection}/payments/${payload.payment}/shipment`,
  success: ({data}) => data,
});

const createPaymentShipment = async.request({
  type: cx.CREATE_PAYMENT_SHIPMENT,
  method: apiClient.post,
  path: ({payload}) =>
    `users/tabs/${payload.collection}/payments/${payload.payment}/shipment`,
  success: ({data}) => data,
  *onSuccess() {
    yield put(getSession());
  },
  *onFailure(err) {
    yield put(clearAlerts());
    yield put(
      errorAlert({
        title: 'Could not calculate shipping cost',
        body:
          err.data && err.data.errors && err.data.errors.length !== 0
            ? err.data.errors[0].details
            : 'Something went wrong',
      })
    );
  },
});

function* purchaseShippingLabel(action) {
  try {
    yield async.report.pending(cx.PURCHASE_SHIPPING_LABEL);
    const {
      collection,
      payment,
      stripeToken,
      savedCardId,
      ...payload
    } = action.payload;

    let cartSourceId = savedCardId;

    if (!cartSourceId) {
      yield call(apiClient.post, 'users/payment_methods', {
        source: stripeToken.id,
        nickname: '',
      });

      cartSourceId = stripeToken.card.id;
    }

    const {data} = yield call(
      apiClient.post,
      `users/tabs/${collection}/payments/${payment}/shipment/purchase`,
      {
        ...payload,
        card_source_id: cartSourceId,
      }
    );

    yield put({
      type: async.success(cx.PURCHASE_SHIPPING_LABEL),
      payload: data,
    });
    yield async.report.success(cx.PURCHASE_SHIPPING_LABEL);

    yield getShippablePayments({
      payload: {
        collection: action.payload.collection,
        query: {
          shippable: true,
          page: 1,
          perPage: cx.PAYMENTS_PER_PAGE,
          sort: 'created_at',
          direction: 'desc',
        },
      },
    });
  } catch (err) {
    yield put(clearAlerts());
    yield put(
      errorAlert({
        title: 'Could not purchase shipping label',
        body:
          err.data && err.data.errors && err.data.errors.length !== 0
            ? err.data.errors[0].details
            : 'Something went wrong',
      })
    );

    yield async.report.failure(cx.PURCHASE_SHIPPING_LABEL);
    yield async.report.error(cx.PURCHASE_SHIPPING_LABEL, err);
  }
}

const createPaymentRefund = async.request({
  type: cx.CREATE_PAYMENT_REFUND,
  method: apiClient.post,
  path: ({payload: {collectionId, paymentId}}) =>
    `users/tabs/${collectionId}/payments/${paymentId}/refunds`,
  onFailure: function* onFailure(err) {
    let body;
    const error = get(err, 'data.error', '');

    switch (error) {
      case 'Non refundable payment':
        body = 'Sorry, this payment is not refundable.';
        break;
      case 'Refundable Balance Exceeded':
        body =
          "Refund amount cannot be more than the collection's available withdrawal balance.";
        break;
      case 'Refund exceeds total payment':
        body = 'Refund amount cannot exceed the total payment.';
        break;
      default:
        body = `Refund failed, please try another amount. If you continue having difficulty, please contact ${config.strings.name} support.`;
    }
    yield put(
      errorAlert({
        body,
        title: 'Error',
      })
    );
  },
  onSuccess: function* onSuccess(action) {
    yield put(getCollection({collection: action.payload.collectionId}));
    yield put(
      getRefundableDataAction({
        collectionId: action.payload.collectionId,
        paymentId: action.payload.paymentId,
      })
    );
    yield put(
      successAlert({
        body: `Refunded ${currency(get(action, 'payload.total', 0), {
          cents: true,
        })}. Email confirmations will be sent shortly.`,
        title: 'Refund Confirmation:',
      })
    );
  },
  success: ({data}) => data,
});

function* deletePayment(action) {
  let growlAlert;
  try {
    yield async.report.pending(cx.DELETE_PAYMENT);
    const {payment} = action.payload;
    yield call(
      apiClient.delete,
      `users/tabs/${payment.tab_id}/payments/${payment.id}`
    );
    yield put(getCollection({collection: payment.tab_id}));
    const payResponse = yield call(apiClient.get, getPaymentsPath(action));
    yield put({
      type: async.success(cx.GET_PAYMENTS),
      payload: normalizePayments(payResponse),
    });
    yield put({type: async.success(cx.DELETE_PAYMENT), payload: {payment}});
    growlAlert = successAlert({
      title: 'Success!',
      body: `Deleted a payment by ${payment.tab_member.name}`,
      icon: FaCheck,
    });
    yield async.report.success(cx.DELETE_PAYMENT);
  } catch (err) {
    growlAlert = errorAlert({
      title: 'Error',
      body: 'Payment was not deleted. Please try again',
      icon: FaBan,
    });
    yield async.report.failure(cx.DELETE_PAYMENT);
    yield async.report.error(cx.DELETE_PAYMENT, err);
  } finally {
    yield put(growlAlert);
  }
}

const sendReceipt = async.request({
  type: cx.SEND_RECEIPT,
  method: apiClient.post,
  path: ({payload: {collection, payment}}) =>
    `users/tabs/${collection}/payments/${payment}/resend_receipt`,
  *onSuccess(action) {
    yield put(
      successAlert({
        title: 'Receipt is sent',
        body: `An email receipt is on its way to ${action.payload.email}.`,
        icon: FaBan,
      })
    );
  },
});

function* updatePayment(action) {
  try {
    yield async.report.pending(cx.UPDATE_PAYMENT);
    const {collection, payment, ...payload} = action.payload;
    yield call(
      apiClient.patch,
      `users/tabs/${collection}/payments/${payment}`,
      payload
    );
    const {data} = yield call(
      apiClient.get,
      `users/tabs/${collection}/payments/${payment}`
    );
    yield put(getCollection({collection}));
    yield put({
      type: async.success(cx.UPDATE_PAYMENT),
      payload: {payment: data},
    });
    yield async.report.success(cx.UPDATE_PAYMENT);
  } catch (err) {
    yield async.report.failure(cx.UPDATE_PAYMENT);
    yield async.report.error(cx.UPDATE_PAYMENT, err);
  }
}

function* getOrdersExport(action) {
  try {
    yield async.report.pending(cx.GET_ORDERS_EXPORT);
    const {collection} = action.payload;
    const {data} = yield call(
      apiClient.get,
      `users/tabs/${collection}/payments/export_data`
    );
    yield put({
      type: async.success(cx.GET_ORDERS_EXPORT),
      payload: {ordersExport: data},
    });
  } catch (err) {
    yield async.report.failure(cx.GET_ORDERS_EXPORT);
    yield async.report.error(cx.GET_ORDERS_EXPORT, err);
  }
}

function* getRefundableData(action) {
  try {
    yield async.report.pending(cx.GET_REFUNDABLE_DATA);
    const {collectionId, paymentId} = action.payload;
    const {data} = yield call(
      apiClient.get,
      `users/tabs/${collectionId}/payments/${paymentId}/refunds/new`
    );

    yield put({
      type: async.success(cx.GET_REFUNDABLE_DATA),
      payload: {
        refundableData: data,
      },
    });
    yield async.report.success(cx.GET_REFUNDABLE_DATA);
  } catch (err) {
    yield async.report.failure(cx.GET_REFUNDABLE_DATA);
    yield async.report.error(cx.GET_REFUNDABLE_DATA, err);
  }
}

const resendRefundConfirmationEmail = async.request({
  type: cx.RESEND_REFUND_CONFIRMATION_EMAIL,
  method: apiClient.post,
  path: ({payload: {collectionId, paymentId, refundId}}) =>
    `users/tabs/${collectionId}/payments/${paymentId}/refunds/${refundId}/resend_emails`,
  *onSuccess() {
    yield put(
      successAlert({
        title: 'Confirmation resent',
        body: `An email is on its way.`,
        icon: FaCheck,
      })
    );
  },
});

export default function* rootSaga() {
  yield takeLatest(cx.CREATE_PAYMENT_REFUND, createPaymentRefund);
  yield takeLatest(cx.GET_PAYMENT, getPayment);
  yield takeLatest(cx.GET_PAYMENTS, getPayments);
  yield takeLatest(cx.GET_SHIPPABLE_PAYMENTS, getShippablePayments);
  yield takeLatest(cx.GET_PAYMENT_SHIPMENT, getPaymentShipment);
  yield takeLatest(cx.PURCHASE_SHIPPING_LABEL, purchaseShippingLabel);
  yield takeLatest(cx.CREATE_PAYMENT_SHIPMENT, createPaymentShipment);
  yield takeLatest(cx.SEND_RECEIPT, sendReceipt);
  yield takeLatest(cx.UPDATE_PAYMENT, updatePayment);
  yield takeLatest(cx.DELETE_PAYMENT, deletePayment);
  yield takeLatest(cx.GET_ORDERS_EXPORT, getOrdersExport);
  yield takeLatest(cx.GET_REFUNDABLE_DATA, getRefundableData);
  yield takeLatest(
    cx.RESEND_REFUND_CONFIRMATION_EMAIL,
    resendRefundConfirmationEmail
  );
}
