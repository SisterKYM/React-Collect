import * as cx from 'redux/modules/invitations/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  collection: null,
  organizer: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.ACCEPT_INVITATION):
    case success(cx.GET_INVITATION):
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default reducer;
