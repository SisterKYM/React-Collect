import * as cx from 'redux/modules/folder/constants';
import {mergePayloadToState} from 'redux/modules/lib';

const initialState = {
  organizerFolder: null,
  managedCollectionFolder: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case cx.CHANGE:
      return mergePayloadToState(state, action);
    default:
      return state;
  }
};

export default reducer;
