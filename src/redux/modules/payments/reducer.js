import {LOCATION_CHANGE} from 'connected-react-router';
import {findIndex} from 'lodash';

import {
  CREATE_ITEM_FIELD_VALUE,
  UPDATE_ITEM_FIELD_VALUE,
} from 'redux/modules/fields/constants';
import {failure, success, pending} from 'redux/modules/async/helpers';

import * as cx from './constants';
import {
  mapCreatePaymentRefundSuccess,
  mapGetPayments,
  mapLocationChange,
  mapUpdatePayment,
} from './lib';

const initialState = {
  pagination: {
    page: 1,
    perPage: 1,
    total: 1,
  },
  payment: null,
  shipment: null,
  payments: [],
  refundableData: null,
  search: '',
  sorted: {
    direction: null,
    sort: null,
  },
  shippablePayments: {
    payments: [],
    search: '',
    sorted: {
      direction: null,
      sort: null,
    },
    pagination: {
      page: 1,
      perPage: 1,
      total: 1,
    },
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case cx.GET_PAYMENTS:
      return mapGetPayments(state, action);
    case cx.UPDATE_PAYMENT:
      return mapUpdatePayment(state, action);
    case success(cx.CREATE_PAYMENT_REFUND):
      return mapCreatePaymentRefundSuccess(state, action);
    case success(cx.GET_PAYMENT):
    case success(cx.GET_PAYMENTS):
    case success(UPDATE_ITEM_FIELD_VALUE):
    case success(CREATE_ITEM_FIELD_VALUE):
    case success(cx.GET_ORDERS_EXPORT):
      return {...state, ...action.payload};
    case success(cx.GET_SHIPPABLE_PAYMENTS):
      return {
        ...state,
        shippablePayments: action.payload.shippablePayments,
      };
    case success(cx.GET_REFUNDABLE_DATA):
      return {
        ...state,
        refundableData: action.payload.refundableData,
      };
    case success(cx.UPDATE_PAYMENT): {
      const {payment} = action.payload;
      const {payments} = state;
      const shippablePayments = state.shippablePayments.payments;
      const idx = findIndex(payments, {id: payment.id});
      payments.splice(idx, 1, {
        ...payment,
        shipment: payments[idx].shipment ? payments[idx].shipment : undefined,
      });
      const idx_shippable = findIndex(shippablePayments, {id: payment.id});
      shippablePayments.splice(idx_shippable, 1, {
        ...payment,
        shipment: shippablePayments[idx].shipment
          ? shippablePayments[idx].shipment
          : undefined,
      });
      const newState = {
        ...state,
        payments,
        shippablePayments: {
          ...state.shippablePayments,
          payments: shippablePayments,
        },
      };
      if (state.payment !== null && state.payment.id === payment.id) {
        newState.payment = payment;
      }

      return newState;
    }
    case success(cx.GET_PAYMENT_SHIPMENT):
    case success(cx.CREATE_PAYMENT_SHIPMENT):
    case success(cx.PURCHASE_SHIPPING_LABEL):
      return {
        ...state,
        shipment: action.payload,
        payments: [],
      };
    case pending(cx.GET_PAYMENT_SHIPMENT):
    case failure(cx.GET_PAYMENT_SHIPMENT):
      return {
        ...state,
        shipment: null,
      };
    case LOCATION_CHANGE:
      return mapLocationChange(state, action);
    default:
      return state;
  }
};

export default reducer;
