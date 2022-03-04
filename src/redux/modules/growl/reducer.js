import {LOCATION_CHANGE} from 'connected-react-router';
import _ from 'lodash';

import * as cx from 'redux/modules/growl/constants';

const initialState = {
  alerts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case cx.CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
      };
    case cx.ERROR_ALERT:
    case cx.SUCCESS_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case cx.REMOVE_ALERT: {
      return {
        ...state,
        alerts: state.alerts.filter(({id}) => id !== action.payload.id),
      };
    }
    case LOCATION_CHANGE: {
      if (
        _.get(action.payload, 'location.state.keepGrowls', false) ||
        _.get(action.payload, 'state.keepGrowls', false)
      ) {
        return state;
      }

      return {
        ...state,
        alerts: [],
      };
    }
    default:
      return state;
  }
};

export default reducer;
