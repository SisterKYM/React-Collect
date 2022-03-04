import {get} from 'lodash';

const mapUpdatePaymentSourceSuccess = (state, action) => {
  const newContract = get(action, 'payload', {});
  const newContracts = [...get(state, 'recurringPayments.contracts', [])];
  const idx = newContracts.findIndex(c => c.id === newContract.id);
  newContracts[idx] = newContract;

  return {
    ...state,
    recurringPayments: {
      ...state.recurringPayments,
      contracts: newContracts,
    },
  };
};

export default mapUpdatePaymentSourceSuccess;
