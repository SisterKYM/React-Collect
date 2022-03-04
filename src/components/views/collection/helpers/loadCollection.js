import {get} from 'lodash';

import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {getCollection} from 'redux/modules/collections/actions';

const loadCollection = (props, promises = []) => {
  const {collection} = props.match.params;
  const state = props.store.getState();
  const collectionInState = get(state, 'collections.collection.id', 0);

  if (collection && collection.toString() !== collectionInState.toString()) {
    promises.push({
      key: GET_COLLECTION,
      promise: getCollection,
      payload: {collection},
    });
  }

  return promises;
};

export default loadCollection;
