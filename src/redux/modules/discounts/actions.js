import * as cx from './constants';

export const createDiscount = payload => ({
  payload,
  type: cx.CREATE_DISCOUNT,
});

export const deleteDiscount = payload => ({
  payload,
  type: cx.DELETE_DISCOUNT,
});

export const getDiscounts = payload => ({
  payload,
  type: cx.GET_DISCOUNTS,
});

export const switchDiscounts = payload => ({
  payload,
  type: cx.SWITCH_DISCOUNTS,
});

export const updateDiscount = payload => ({
  payload,
  type: cx.UPDATE_DISCOUNT,
});
