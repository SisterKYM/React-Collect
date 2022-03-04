import {LOCATION_CHANGE} from 'connected-react-router';

import * as cx from 'redux/modules/stripe/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  plan: [],
  paymentMethod: null,
  checkResults: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.UPDATE_SUBSCRIPTION):
    case cx.CLEAR_CHECKED_SUBSCRIPTION:
      return {
        ...state,
        checkResults: null,
      };
    case success(cx.CHECK_SUBSCRIPTION):
      return {
        ...state,
        checkResults: action.payload.checkResults,
      };
    case LOCATION_CHANGE:
      return {
        ...state,
        checkResults: null,
        fields: [],
      };
    default:
      return state;
  }
};

export default reducer;
