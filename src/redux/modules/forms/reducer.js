import {LOCATION_CHANGE} from 'connected-react-router';
import {sortBy} from 'lodash';

import * as cx from 'redux/modules/forms/constants';
import {success} from 'redux/modules/async/helpers';

const initialState = {
  form: null,
  forms: [],
  fields: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_FORM):
    case success(cx.GET_FORMS):
    case success(cx.UPDATE_FORM):
    case success(cx.CREATE_FORM):
    case success(cx.CREATE_WAIVER):
    case success(cx.DELETE_FORM):
      return {...state, ...action.payload};
    case cx.SET_FIELDS:
      return {
        ...state,
        fields: action.payload,
      };
    case LOCATION_CHANGE: {
      return {
        ...state,
        form: null,
        fields: [],
      };
    }
    case cx.SORT_FORMS: {
      const {order} = action.payload;
      const forms = state.forms.map(form => {
        const index = order.indexOf(form.id);
        if (index < 0) {
          return form;
        }
        form.position = index;

        return form;
      });

      return {
        ...state,
        forms: sortBy(forms, ['position']),
      };
    }
    default:
      return state;
  }
};

export default reducer;
