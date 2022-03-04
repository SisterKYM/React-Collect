import * as cx from 'redux/modules/members/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  members: [],
  invites: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_MEMBERS):
    case success(cx.GET_INVITES):
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default reducer;
