import {CHANGE as FORM_CHANGE} from 'redux-form/lib/actionTypes';
import {LOCATION_CHANGE} from 'connected-react-router';

import * as cx from 'redux/modules/collections/constants';
import {mergePayloadToState} from 'redux/modules/lib';
import {success} from 'redux/modules/async/helpers';

import {mapLocationChange, mapUpdateCollection} from './lib';

const initialState = {
  folders: [],
  attachments: [],
  collections: [],
  collection: null,
  collectionsOpen: [],
  collectionsClosed: [],
  collectionsNoFolder: [],
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return mapLocationChange(state, action);
    case cx.UPDATE_COLLECTION:
      return mapUpdateCollection(state, action);
    case cx.CHANGE:
    case success(cx.GET_COLLECTIONS):
    case success(cx.UPDATE_COLLECTION):
      return mergePayloadToState(state, action);
    case success(cx.GET_ATTACHMENTS):
      return {
        ...state,
        attachments: action.payload,
      };
    case success(cx.GET_COLLECTION): {
      const {collection} = action.payload;

      return {
        ...state,
        collection,
      };
    }
    case FORM_CHANGE: {
      const {collection} = state;
      const {form, field} = action.meta;
      switch (form) {
        case 'CollectionForm':
          return {
            ...state,
            collection: {
              ...collection,
              [field]: action.payload,
            },
          };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};

export default reducer;
