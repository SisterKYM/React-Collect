import React, {useCallback, useEffect, useState} from 'react';
import ReactSortable from 'react-sortablejs';
import cx from 'classnames';
import {sortBy} from 'lodash';

import {dragHandle, sortableOptions} from 'theme/sortable';

import CollectionListCategoryHeader from './CollectionListCategoryHeader';
import CollectionListItem from '../CollectionListItem';

const CollectionListCategory = ({
  category,
  sharedCollections,
  folders,
  removeCollection,
  setTo,
  removeCategory,
  editCategory,
  onCollectionOrderChange,
}) => {
  const [expanded, setExpanded] = useState(true);

  const [sharedCategoryCollections, setSharedCategoryCollections] = useState(
    []
  );
  useEffect(() => {
    const updatedSharedCategoryCollections = sortBy(sharedCollections, (c) =>
      (Array.isArray(category.collectionOrder)
        ? category.collectionOrder
        : []
      ).indexOf(c.id)
    ).filter(
      (collection) =>
        collection.groupPage?.shared &&
        collection.groupPage?.categoryId === category.uuid
    );
    setSharedCategoryCollections((prevSharedCategoryCollections) =>
      prevSharedCategoryCollections.length === 0 &&
      updatedSharedCategoryCollections.length === 0
        ? prevSharedCategoryCollections
        : updatedSharedCategoryCollections
    );
  }, [category.collectionOrder, category.uuid, sharedCollections]);

  const onSortableChange = useCallback(
    (sortedCollectionIds) => {
      if (sortedCollectionIds.length > sharedCategoryCollections.length) {
        setTo({
          categoryUuid: category.uuid,
          collectionId: Number(
            sortedCollectionIds.find(
              (collectionId) =>
                !sharedCategoryCollections.find(
                  (sharedCategoryCollection) =>
                    sharedCategoryCollection.id === Number(collectionId)
                ) &&
                sharedCollections.find(
                  (sharedCollection) =>
                    sharedCollection.id === Number(collectionId)
                )
            )
          ),
        });
      }

      onCollectionOrderChange(
        category,
        sortedCollectionIds.map((id) => Number(id))
      );
    },
    [
      sharedCategoryCollections,
      onCollectionOrderChange,
      category,
      setTo,
      sharedCollections,
    ]
  );

  const removeThisCategory = useCallback(async () => {
    await removeCategory(sharedCategoryCollections, category);
  }, [category, removeCategory, sharedCategoryCollections]);

  const editThisCategory = useCallback(() => {
    editCategory(category);
  }, [category, editCategory]);

  return (
    <div className="ph3-5 pt3-25 pb4 bg-white br2-ns card">
      <CollectionListCategoryHeader
        category={category}
        expanded={expanded}
        onChangeExpanded={setExpanded}
        removeCategory={removeThisCategory}
        editCategory={editThisCategory}
      />
      {expanded &&
        (sharedCategoryCollections.length > 0 ? (
          <ReactSortable
            options={{
              ...sortableOptions,
              group: 'collections',
            }}
            onChange={onSortableChange}
          >
            {sharedCategoryCollections.map((collection) => (
              <div
                key={collection.id}
                data-id={collection.id}
                className={cx(dragHandle, 'move dark-grey')}
              >
                <CollectionListItem
                  collection={collection}
                  folders={folders}
                  removeCollection={removeCollection}
                  className="mt3-25"
                />
              </div>
            ))}
          </ReactSortable>
        ) : (
          <div className="empty-collections b-light-grey ba br2 mt3-25">
            <ReactSortable
              options={{
                ...sortableOptions,
                group: 'collections',
              }}
              onChange={onSortableChange}
            >
              <h4 className="avenir-light text-16 medium-grey tc">
                Drag and drop collections here
              </h4>
            </ReactSortable>
          </div>
        ))}
    </div>
  );
};

const EnhancedItemListCategory = React.memo(CollectionListCategory);

export default EnhancedItemListCategory;
