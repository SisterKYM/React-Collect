import {clone, findIndex, get, merge} from 'lodash';

import {normalizeCollections} from 'redux/modules/collections/helpers';

const mapUpdateCollection = (state, action) => {
  const actionPayload = get(action, 'payload', {});
  const stateCollection = get(state, 'collection', null);
  const stateCollections = get(state, 'collections', []);
  const stateFolders = get(state, 'folders', []);

  let nextCollection = null;
  let nextCollections = [];

  if (stateCollections.length !== 0) {
    const nextCollectionIdx = findIndex(
      stateCollections,
      c => c.id === actionPayload.id
    );

    if (nextCollectionIdx !== -1) {
      nextCollection = {
        ...stateCollections[nextCollectionIdx],
        ...actionPayload,
      };

      nextCollections = [...stateCollections];
      nextCollections.splice(nextCollectionIdx, 1, nextCollection);
    }
  }

  if (stateCollection) {
    nextCollection = clone(merge(stateCollection, actionPayload));
  }

  return {
    ...state,
    ...normalizeCollections(nextCollections, stateFolders),
    collection: nextCollection,
  };
};

export default mapUpdateCollection;
