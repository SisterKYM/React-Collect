import {get} from 'lodash';

// get either /create-collection or /collection/:id style urls
// based on whether or not there is a collection present.
const collectionsPathHelper = (collection = {}, path = '', owner = null) => {
  const ownerId = get(owner, 'id') || get(collection, 'user_id') || owner;

  if (!ownerId) {
    return '';
  }

  const pathParam = path || 'details';

  if (!collection || !collection.id) {
    return `/collection/${ownerId}/${pathParam}`;
  }

  return `/collection/${ownerId}/${collection.id}/${pathParam}`;
};

export default collectionsPathHelper;
