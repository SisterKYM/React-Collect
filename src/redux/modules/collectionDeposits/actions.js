import * as cx from './constants';

const getCollectionDeposits = payload => ({
  type: cx.GET_COLLECTION_DEPOSITS,
  payload,
});

const createCollectionDeposit = payload => ({
  type: cx.CREATE_COLLECTION_DEPOSIT,
  payload,
});

export {createCollectionDeposit, getCollectionDeposits};
