import {filter, reject} from 'lodash';

const normalizeItems = (items, query = {}) => {
  const itemsWithCategory = filter(items, 'parent_id');
  const itemsNoCategory = reject(items, 'parent_id');

  return {
    items,
    itemsWithCategory,
    itemsNoCategory,
    ...query,
  };
};

export default normalizeItems;
