import {LOCATION_CHANGE} from 'connected-react-router';

import {STATUS, ERROR} from 'redux/modules/async/constants';

const initialState = {
  errors: {},
  statuses: {},
  metadatas: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const {location} = action.payload;

      if (location.state && location.state.preserveStatuses) {
        return state;
      }

      return {
        errors: {},
        statuses: {},
        metadatas: {},
      };
    }
    case STATUS: {
      const {type, status, metadata} = action.payload;
      const {statuses, metadatas} = state;
      statuses[type] = status;
      metadatas[type] = metadata;

      return {...state, statuses, metadatas};
    }
    case ERROR: {
      const {type, error, metadata} = action.payload;
      const {errors, metadatas} = state;
      errors[type] = error;
      metadatas[type] = metadata;

      return {...state, errors, metadatas};
    }
    default:
      return state;
  }
};

export default reducer;
