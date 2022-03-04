const CREATE_PAYMENT_REFUND = '@@cheddarup/payments/createPaymentRefund';
const GET_PAYMENT = '@@cheddarup/payments/getPayment';
const GET_PAYMENTS = '@@cheddarup/payments/getPayments';
const SEND_RECEIPT = '@@cheddarup/payments/sendReceipt';
const UPDATE_PAYMENT = '@@cheddarup/payments/updatePayment';
const DELETE_PAYMENT = '@@cheddarup/payments/deletePayment';
const GET_ORDERS_EXPORT = '@@cheddarup/payments/getExportOrders';
const GET_PAYMENT_SHIPMENT = '@@cheddarup/payments/getPaymentShipment';
const CREATE_PAYMENT_SHIPMENT = '@@cheddarup/payments/createPaymentShipment';
const PURCHASE_SHIPPING_LABEL = '@@cheddarup/payments/purchaseShippingLabel';
const GET_SHIPPABLE_PAYMENTS = '@@cheddarup/payments/getShippablePayments';
const GET_REFUNDABLE_DATA = '@@cheddarup/payments/getRefundableData';
const RESEND_REFUND_CONFIRMATION_EMAIL =
  '@@cheddarup/payments/resendRefundConfirmationEmail';

const sd = {
  ASC: 'asc',
  DESC: 'desc',
};

const PAYMENTS_PER_PAGE = 25;
const SORT_PAYMENTS_BY = {
  createdAt: {
    direction: sd.DESC,
    label: 'created_at',
  },
  labelCreatedAt: {
    direction: sd.DESC,
    label: 'shipment.id',
  },
  email: {
    direction: sd.ASC,
    label: 'tab_members.email',
  },
  method: {
    direction: sd.ASC,
    label: 'payment_method',
  },
  status: {
    direction: sd.ASC,
    label: 'status',
  },
  name: {
    direction: sd.ASC,
    label: 'tab_members.name',
  },
  note: {
    direction: sd.ASC,
    label: 'note',
  },
};

export {
  CREATE_PAYMENT_REFUND,
  CREATE_PAYMENT_SHIPMENT,
  DELETE_PAYMENT,
  GET_ORDERS_EXPORT,
  GET_PAYMENT_SHIPMENT,
  GET_PAYMENT,
  GET_PAYMENTS,
  GET_REFUNDABLE_DATA,
  GET_SHIPPABLE_PAYMENTS,
  PAYMENTS_PER_PAGE,
  PURCHASE_SHIPPING_LABEL,
  RESEND_REFUND_CONFIRMATION_EMAIL,
  SEND_RECEIPT,
  SORT_PAYMENTS_BY,
  UPDATE_PAYMENT,
};
