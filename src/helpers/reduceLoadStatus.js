import {castArray, includes, every, compact} from 'lodash';

const reduceLoadStatus = status => {
  const statuses = compact(castArray(status));

  if (statuses.length === 0 || includes(statuses, 'pending')) {
    return 'pending';
  }
  if (every(statuses, 'success')) {
    return 'success';
  }

  return statuses[0] || 'pending';
};

export default reduceLoadStatus;
