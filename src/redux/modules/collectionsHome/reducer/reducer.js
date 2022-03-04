import * as cx from 'redux/modules/collectionsHome/constants';
import {mergePayloadToState} from 'redux/modules/lib';
import {success} from 'redux/modules/async/helpers';

import {INITIAL_STATE} from './config';

const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case success(cx.GET_COLLECTIONS):
      return mergePayloadToState(state, action);
    default:
      return state;
  }
};

export default reducer;
