import {filter, reject, groupBy} from 'lodash';

import sortCollections from './sortCollections';

const normalizeCollections = (collections, folderObjects) => {
  const collectionsSorted = sortCollections(collections);
  const collectionsOpen = reject(collectionsSorted, c => c.closed_at);
  const collectionsClosed = filter(collectionsSorted, c => c.closed_at);
  const groupedByFolder = groupBy(
    collectionsSorted,
    c => (c?.folder?.user_id === c?.user_id && c?.folder?.id) || 'none'
  );
  const folders = folderObjects.map(i => ({
    ...i,
    collections: groupedByFolder[i.id] || [],
  }));

  return {
    collectionsOpen,
    collectionsClosed,
    collections: collectionsSorted,
    collectionsNoFolder: groupedByFolder.none || [],
    folders,
  };
};

export default normalizeCollections;
