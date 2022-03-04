import * as cx from 'redux/modules/themes/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  themes: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_THEMES):
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default reducer;
