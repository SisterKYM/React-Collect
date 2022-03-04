import {get} from 'lodash';

// get either /create-collection or /collection/:id style urls
// based on whether or not there is a collection present.
const collectionsRouterPathHelper = (params = {}, path = '') => {
  const owner = get(params, 'owner');
  const collection = get(params, 'collection');
  if (!owner || !collection) {
    return '';
  }
  const pathParam = path || 'details';

  return `/collection/${owner}/${collection}/${pathParam}`;
};

export default collectionsRouterPathHelper;
