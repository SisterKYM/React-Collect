import * as cx from './constants';

export const login = payload => ({type: cx.LOGIN, payload});
export const forgotPassword = payload => ({type: cx.FORGOT_PASSWORD, payload});
export const resetPassword = payload => ({type: cx.RESET_PASSWORD, payload});
export const signUp = payload => ({type: cx.SIGNUP, payload});
export const getSession = payload => ({type: cx.GET_SESSION, payload});
export const getPaymentsToOthers = payload => ({
  type: cx.GET_PAYMENTS_TO_OTHERS,
  payload,
});
export const getPaymentToOthers = payload => ({
  type: cx.GET_PAYMENT_TO_OTHERS,
  payload,
});
export const logout = payload => ({type: cx.LOGOUT, payload});
export const updateUser = payload => ({type: cx.UPDATE_USER, payload});
export const cancelAccount = payload => ({type: cx.CANCEL_ACCOUNT, payload});
export const updateUserSlug = payload => ({
  type: cx.UPDATE_USER_SLUG,
  payload,
});
export const startPhoneVerification = payload => ({
  type: cx.START_PHONE_VERIFICATION,
  payload,
});
export const completePhoneVerification = payload => ({
  type: cx.COMPLETE_PHONE_VERIFICATION,
  payload,
});
export const requestVerificationCode = payload => ({
  type: cx.REQUEST_VERIFICATION_CODE,
  payload,
});
export const resetPhone = payload => ({
  type: cx.RESET_PHONE,
  payload,
});
export const clearBackupSecurityCode = () => ({
  type: cx.CLEAR_BACKUP_SECURITY_CODE,
});
export const updateProfileImage = payload => ({
  type: cx.UPDATE_PROFILE_IMAGE,
  payload,
});
