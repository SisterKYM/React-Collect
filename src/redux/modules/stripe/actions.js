import * as cx from 'redux/modules/stripe/constants';

export const checkSubscription = (payload) => ({
  type: cx.CHECK_SUBSCRIPTION,
  payload,
});
export const clearCheckedSubscription = () => ({
  type: cx.CLEAR_CHECKED_SUBSCRIPTION,
});
export const updateSubscription = (payload) => ({
  type: cx.UPDATE_SUBSCRIPTION,
  payload,
});
