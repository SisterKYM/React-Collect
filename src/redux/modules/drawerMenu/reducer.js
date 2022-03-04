import {CALCULATE_RESPONSIVE_STATE} from 'redux-responsive';
import {LOCATION_CHANGE} from 'connected-react-router';

import * as cx from './constants';

const initialState = {
  open: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case cx.CHANGE:
      return {...state, ...action.payload};
    case LOCATION_CHANGE:
    case CALCULATE_RESPONSIVE_STATE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default reducer;
