import {success} from 'redux/modules/async/helpers';

import * as cx from './constants';

const initialState = {
  pagination: {
    page: 1,
    perPage: 1,
    total: 1,
  },
  search: '',
  orgMembers: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_ORG_MEMBERS):
    case success(cx.REMOVE_ORG_MEMBER):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
