import * as cx from './constants';

export const setStatus = (type, status, metadata = {}) => ({
  payload: {type, status, metadata},
  type: cx.STATUS,
});
