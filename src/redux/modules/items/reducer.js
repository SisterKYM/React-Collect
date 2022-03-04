import {LOCATION_CHANGE} from 'connected-react-router';

import * as cx from 'redux/modules/items/constants';
import {
  CREATE_ITEM_FIELD_VALUE,
  UPDATE_ITEM_FIELD_VALUE,
} from 'redux/modules/fields/constants';
import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {pending, progress, success} from 'redux/modules/async/helpers';

const initialState = {
  items: [],
  itemsWithCategory: [],
  itemsNoCategory: [],
  item: null,
  fields: [],
  upload: null,
  uploadProgress: 0,
  itemsUpload: null,
  imagesUpload: null,
  search: '',
  sorted: {
    direction: null,
    sort: null,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case success(cx.GET_ITEM):
    case success(cx.GET_ITEMS):
    case success(UPDATE_ITEM_FIELD_VALUE):
    case success(CREATE_ITEM_FIELD_VALUE):
    case success(cx.UPLOAD_ITEMS):
    case success(cx.UPLOAD_IMAGES):
    case progress(cx.UPLOAD_IMAGES):
      return {
        ...state,
        ...action.payload,
      };
    case cx.SET_FIELDS:
      return {
        ...state,
        fields: action.payload,
      };
    case pending(GET_COLLECTION):
      return {
        ...state,
        item: null,
        itemsUpload: null,
        imagesUpload: null,
        uploadProgress: 0,
        items: [],
        itemsWithCategory: [],
        itemsNoCategory: [],
        fields: [],
      };
    case LOCATION_CHANGE: {
      const nextState = {
        ...state,
        itemsUpload: null,
        imagesUpload: null,
        uploadProgress: 0,
      };

      if (!action.payload.location.pathname.includes('/collection/')) {
        nextState.items = [];

        return nextState;
      }

      return nextState;
    }
    default:
      return state;
  }
};

export default reducer;
