import * as cx from 'redux/modules/fields/constants';

export const createItemFieldValue = payload => ({
  type: cx.CREATE_ITEM_FIELD_VALUE,
  payload,
});

export const updateItemFieldValue = payload => ({
  type: cx.UPDATE_ITEM_FIELD_VALUE,
  payload,
});
