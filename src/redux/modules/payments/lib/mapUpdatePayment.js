import {findIndex} from 'lodash';

const mapUpdatePayment = (state, action) => {
  if (!action) {
    return {...state};
  }

  const payments = [...(state.payments || [])];
  const pIndex = findIndex(payments, p => p.id === action.payload.payment);
  payments[pIndex].status = action.payload.status;

  return {
    ...state,
    payments,
  };
};

export default mapUpdatePayment;
