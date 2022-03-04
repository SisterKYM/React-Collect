import {LOCATION_CHANGE} from 'connected-react-router';

import * as cx from 'redux/modules/withdrawals/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  withdrawals: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_WITHDRAWALS):
      return {...state, withdrawals: action.payload};
    case LOCATION_CHANGE:
      return {
        ...state,
        withdrawals: [],
      };
    default:
      return state;
  }
};

export default reducer;
