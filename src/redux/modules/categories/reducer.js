import {sortBy} from 'lodash';

import {success} from 'redux/modules/async/helpers';

import * as cx from './constants';

const initialState = {
  category: null,
  categories: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_CATEGORIES):
      return {
        ...state,
        categories: sortBy(action.payload.categories, ['position']),
      };
    default:
      return state;
  }
};

export default reducer;
