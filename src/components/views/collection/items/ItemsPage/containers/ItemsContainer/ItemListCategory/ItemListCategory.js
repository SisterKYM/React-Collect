import React from 'react';

import {sortableOptions} from 'theme/sortable';

import {ItemList} from '../components';
import ItemsListCategoryHeader from './ItemsListCategoryHeader';

const ItemListCategory = ({
  itemRowRefs,
  itemCount,
  collection,
  category,
  items,
  onSubmitItemUpdate,
  onSort,
}) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <div className="ph2 ph3-ns pv3 shadow-light bg-white br2-ns ba b--gray-300">
      <ItemsListCategoryHeader
        collection={collection}
        category={category}
        expanded={expanded}
        onChangeExpanded={setExpanded}
      />
      {expanded && (
        <ItemList
          itemRowRefs={itemRowRefs}
          className="mt3"
          itemCount={itemCount}
          items={items}
          collection={collection}
          categoryId={category.id}
          sortableOptions={sortableOptions}
          onSort={(order, _sortableInstance, event) => {
            onSort(order, category.id, event);
          }}
          onSubmitItemUpdate={onSubmitItemUpdate}
        />
      )}
    </div>
  );
};

const EnhancedItemListCategory = React.memo(ItemListCategory);

export default EnhancedItemListCategory;
