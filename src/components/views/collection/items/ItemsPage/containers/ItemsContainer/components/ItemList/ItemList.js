import React from 'react';
import ReactSortable from 'react-sortablejs';
import cx from 'classnames';

import ItemRow from './ItemRow';

const ItemList = ({
  itemRowRefs,
  className,
  itemCount,
  sortableOptions,
  collection,
  items,
  onSort,
}) => {
  const options = React.useMemo(
    () => ({
      ...sortableOptions,
      group: 'items',
    }),
    [sortableOptions]
  );

  const handleChangeSort = React.useCallback(
    (order, _sortableInstance, event) => {
      if (order.length >= items.length) {
        onSort(order, null, event);
      }
    },
    [items, onSort]
  );

  return (
    <ReactSortable
      className={cx(items.length === 0 && 'pv3 ba b--gray-300', className)}
      options={options}
      onChange={handleChangeSort}
    >
      {items.length === 0 ? (
        <h4 className="mv3 tc gray-300">Drag Items Here</h4>
      ) : (
        items.map((item, idx) => (
          <div
            key={item.id}
            data-id={item.id}
            className={items.length - 1 !== idx ? 'mb3' : ''}
          >
            <ItemRow
              ref={itemRowRefs[item.id]}
              itemCount={itemCount}
              collection={collection}
              item={item}
            />
          </div>
        ))
      )}
    </ReactSortable>
  );
};

const EnhancedItemList = React.memo(ItemList);

export default EnhancedItemList;
