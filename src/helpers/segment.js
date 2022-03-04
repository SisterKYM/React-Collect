import {EventTypes} from 'redux-segment';
import {LOCATION_CHANGE} from 'connected-react-router';

export const actionsMapper = {
  mapper: {
    [LOCATION_CHANGE]: EventTypes.page,
  },
};
