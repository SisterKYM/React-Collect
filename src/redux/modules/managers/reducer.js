import * as cx from 'redux/modules/managers/constants';
import {success} from 'redux/modules/async/helpers';

import {mapDeleteManager, mapUpdateManagerSuccess} from './lib';

const initialState = {
  managers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case cx.DELETE_MANAGER:
      return mapDeleteManager(state, action);
    case success(cx.GET_MANAGERS):
    case success(cx.INVITE_MANAGER):
    case success(cx.DELETE_MANAGER):
      return {
        ...state,
        managers: [...action.payload],
      };
    case success(cx.UPDATE_MANAGER):
      return mapUpdateManagerSuccess(state, action);
    default:
      return {...state};
  }
};

export default reducer;
