import {
  compose,
  setDisplayName,
  setPropTypes,
  withHandlers,
  withState,
} from 'recompose';
import {get, omit} from 'lodash';
import React, {PureComponent} from 'react';

import {ListItem} from 'views/user/components/Lists';

import {PROP_TYPES} from './config';
import {clearDeletingItems, deleteListItem} from './lib';

class List extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.items.length > this.props.items.length) {
      this.props.clearDeletingItems(prevProps.items, this.props.items);
    }

    if (
      get(prevProps, 'status.label') !== 'failure' &&
      get(this.props, 'status.label') === 'failure'
    ) {
      this.props.setDeleting({
        ...omit(prevProps.deleting, [get(this.props, 'status.id')]),
      });
    }
  }

  render() {
    const {deleteDisabled, deleting, items} = this.props;

    return (
      <ul>
        {items.map(item => (
          <ListItem
            item={item}
            key={item.id}
            deleteDisabled={deleteDisabled}
            onDelete={this.props.deleteListItem}
            pending={deleting[item.id]}
          />
        ))}
      </ul>
    );
  }
}

const enhance = compose(
  setDisplayName('views/user/components/Lists/List'),
  setPropTypes(PROP_TYPES),
  withState('deleting', 'setDeleting', {}),
  withHandlers({
    clearDeletingItems,
    deleteListItem,
  })
);

const EnhancedList = enhance(List);

export default EnhancedList;
