import {get} from 'lodash';

import {failure, success} from 'redux/modules/async/helpers';

import * as cx from './constants';
import {mapUpdateUserSlug} from './helpers';

const initialState = {
  user: null,
  balance: 0,
  organization: null,
  isProUser: false,
  isTeamUser: false,
  chargesEnabled: true,
  payoutsEnabled: true,
  sessionLoading: true,
  sessionLoaded: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case cx.UPDATE_USER_SLUG:
      return mapUpdateUserSlug(state, action);
    case success(cx.LOGIN):
    case success(cx.SIGNUP):
    case success(cx.UPDATE_USER):
    case success(cx.UPDATE_USER_SLUG):
    case success(cx.UPDATE_PROFILE_IMAGE):
    case success(cx.GET_PAYMENTS_TO_OTHERS):
    case success(cx.GET_PAYMENT_TO_OTHERS):
      return {
        ...state,
        ...action.payload,
      };
    case success(cx.CANCEL_ACCOUNT):
    case success(cx.LOGOUT):
      return {
        ...initialState,
        sessionLoading: false,
      };
    case cx.GET_SESSION:
      return {...state};
    case failure(cx.GET_SESSION):
      return {...state, sessionLoading: false};
    case success(cx.GET_SESSION):
      return {
        ...state,
        ...action.payload,
        sessionLoading: false,
        sessionLoaded: true,
      };
    case success(cx.COMPLETE_PHONE_VERIFICATION):
      return {
        ...state,
        phoneJustVerified: true,
        phoneJustReset: false,
        backupSecurityCode: get(action.payload, 'data.reset_code', undefined),
      };
    case success(cx.RESET_PHONE):
      return {
        ...state,
        phoneJustVerified: false,
        phoneJustReset: true,
        backupSecurityCode: undefined,
      };
    case cx.CLEAR_BACKUP_SECURITY_CODE:
      return {
        ...state,
        backupSecurityCode: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
