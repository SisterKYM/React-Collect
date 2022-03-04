import * as cx from 'redux/modules/memberInvites/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  pagination: {
    page: 1,
    perPage: 1,
    total: 1,
  },
  search: '',
  memberInvites: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_MEMBER_INVITES):
    case success(cx.ADD_MEMBER_INVITES):
    case success(cx.REMOVE_MEMBER_INVITE):
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default reducer;
