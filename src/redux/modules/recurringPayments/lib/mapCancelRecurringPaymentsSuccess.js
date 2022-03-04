import {get} from 'lodash';

const mapCancelRecurringPaymentsSuccess = (state, action) => {
  const newContract = get(action, 'payload');
  const contracts = [...get(state, 'recurringPayments.contracts', [])];
  const idx = contracts.findIndex(c => c.id === newContract.id);
  if (idx > -1) {
    contracts[idx] = newContract;
  }

  return {
    ...state,
    recurringPayments: {
      ...state.recurringPayments,
      contracts,
    },
  };
};

export default mapCancelRecurringPaymentsSuccess;
