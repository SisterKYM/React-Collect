import React, {useCallback} from 'react';

import {
  Checkbox,
  CollectionListItemImage,
  CollectionListItemStatus,
} from 'elements';

const CollectionListItemMobile = ({collection, toggleCollection, checked}) => {
  const toggleThisCollection = useCallback(() => {
    toggleCollection(collection);
  }, [toggleCollection, collection]);

  return (
    <>
      <div className="collection-item horizontal-flex">
        <Checkbox
          className="mr3"
          checked={checked}
          onChange={toggleThisCollection}
        />
        <div className="collection-item-box br2 ba b-light-grey horizontal-flex flex-fill mr2">
          <CollectionListItemImage
            className="collection-image-sm"
            image={collection.theme?.image}
          />
          <div className="flex-fill ml3 text-16 avenir-roman vertical-flex">
            <div className="collection-name">{collection.name}</div>
            <div className="mr4 text-14 avenir-light">
              <CollectionListItemStatus collection={collection} />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .collection-item {
          padding: 1rem 0;
        }
        .collection-item-box {
          padding: 0.75rem 0.75rem;
          border-color: #dddddd;
          align-items: center;
        }
        .collection-name {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 200px;
        }
      `}</style>
    </>
  );
};

const EnhancedCollectionListItemMobile = React.memo(CollectionListItemMobile);

export default EnhancedCollectionListItemMobile;
