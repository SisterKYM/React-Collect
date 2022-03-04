import {LOCATION_CHANGE} from 'connected-react-router';

import {success} from 'redux/modules/async/helpers';

import * as cx from './constants';

const initialState = {
  collectionDeposits: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_COLLECTION_DEPOSITS):
      return {
        ...state,
        ...action.payload,
      };
    case LOCATION_CHANGE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
