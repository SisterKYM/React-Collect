import {find, get, noop, unset} from 'lodash';

const clearDeletingItems = props => (prevItems, nextItems, callback) => {
  const deleting = {...props.deleting};
  const setDeleting = get(props, 'setDeleting', noop);

  prevItems
    .filter(pi => !find(nextItems, ni => ni.id === pi.id))
    .forEach(pi => {
      unset(deleting, pi.id);
    });
  setDeleting(deleting, callback);
};

export default clearDeletingItems;
