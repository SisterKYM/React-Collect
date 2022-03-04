import * as cx from './constants';

export function getCategories(payload) {
  return {type: cx.GET_CATEGORIES, payload};
}
