import * as cx from 'redux/modules/payments/constants';

const createPaymentRefund = payload => ({
  type: cx.CREATE_PAYMENT_REFUND,
  payload,
});
const getPayment = payload => ({type: cx.GET_PAYMENT, payload});
const getPayments = payload => ({type: cx.GET_PAYMENTS, payload});
const getPaymentShipment = payload => ({
  type: cx.GET_PAYMENT_SHIPMENT,
  payload,
});
const createPaymentShipment = payload => ({
  type: cx.CREATE_PAYMENT_SHIPMENT,
  payload,
});
const purchaseShippingLabel = payload => ({
  type: cx.PURCHASE_SHIPPING_LABEL,
  payload,
});
const sendReceipt = payload => ({type: cx.SEND_RECEIPT, payload});
const updatePayment = payload => ({type: cx.UPDATE_PAYMENT, payload});
const deletePayment = payload => ({type: cx.DELETE_PAYMENT, payload});
const getOrdersExport = payload => ({
  type: cx.GET_ORDERS_EXPORT,
  payload,
});
const getShippablePayments = payload => ({
  type: cx.GET_SHIPPABLE_PAYMENTS,
  payload,
});
const getRefundableData = payload => ({
  type: cx.GET_REFUNDABLE_DATA,
  payload,
});
const resendRefundConfirmationEmail = payload => ({
  type: cx.RESEND_REFUND_CONFIRMATION_EMAIL,
  payload,
});

export {
  createPaymentRefund,
  createPaymentShipment,
  deletePayment,
  getOrdersExport,
  getPayment,
  getPayments,
  getPaymentShipment,
  getRefundableData,
  getShippablePayments,
  purchaseShippingLabel,
  resendRefundConfirmationEmail,
  sendReceipt,
  updatePayment,
};
