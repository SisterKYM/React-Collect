import {orderBy} from 'lodash';

const sortCollections = collections => {
  const displayOrderIsNull = collections.filter(c => c.display_order === null);
  const displayOrderIsValue = collections.filter(c => c.display_order !== null);

  return [
    ...orderBy(displayOrderIsNull, ['id'], ['desc']),
    ...orderBy(displayOrderIsValue, ['display_order'], ['asc']),
  ];
};

export default sortCollections;
