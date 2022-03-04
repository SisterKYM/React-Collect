import {success} from 'redux/modules/async/helpers';

import * as cx from './constants';

const initialState = {
  discounts: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_DISCOUNTS):
      return {
        ...state,
        discounts: action.payload.sort((a, b) => a.id - b.id),
      };
    default:
      return {...state};
  }
};

export default reducer;
