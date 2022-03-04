import {get, noop} from 'lodash';

const deleteListItem = props => item => {
  const onDelete = get(props, 'onDelete', noop);
  const setDeleting = get(props, 'setDeleting', noop);
  setDeleting({
    ...props.deleting,
    [item.id]: true,
  });
  onDelete(item);
};

export default deleteListItem;
