import {findIndex, get} from 'lodash';

const mapCreatePaymentRefundSuccess = (state, action) => {
  const payment = get(action, 'payload', {});
  const payments = [...get(state, 'payments', [])];
  const idx = findIndex(payments, {id: payment.id});

  payments[idx] = payment;

  return {...state, payment, payments};
};

export default mapCreatePaymentRefundSuccess;
