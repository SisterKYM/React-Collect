import * as cx from 'redux/modules/sellersForms/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  forms: [],
  form: null,
  sellers: [],
  seller: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_SELLER_FORM):
    case success(cx.GET_SELLERS_FORMS):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
