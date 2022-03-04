import React, {useCallback, useMemo} from 'react';
import {MdClose} from 'react-icons/md';
import cx from 'classnames';

import {CollectionListItemImage, CollectionListItemStatus} from 'elements';

const CollectionListItemMobile = ({
  className,
  collection,
  folders,
  removeCollection,
}) => {
  const folder = useMemo(
    () => folders.find((folder) => folder.id === collection.folderId),
    [collection.folderId, folders]
  );

  const onCloseClick = useCallback(() => {
    removeCollection(collection);
  }, [collection, removeCollection]);

  return (
    <>
      <div
        className={cx(
          'collection-item-box br2 ba b-light-grey horizontal-flex flex-fill',
          className
        )}
      >
        <CollectionListItemImage
          className="collection-image-sm ma1"
          image={collection.headerImage}
        />
        <div className="flex-fill mh3">
          <div className="relative-fill">
            <div className="absolute-fill flex flex-column justify-center">
              <div className="text-16 avenir-roman ellipsis-text">
                {collection.name}
              </div>
              <div className="text-14 avenir-light">{folder?.name}</div>
              <div className="text-14 avenir-light">
                <CollectionListItemStatus collection={collection} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <MdClose
            className="br2 bg-gray-250 medium-grey pointer"
            size={24}
            onClick={onCloseClick}
          />
        </div>
      </div>
      <style jsx>{`
        .collection-item {
          padding: 1rem 0;
        }
        .collection-item-box {
          padding: 0.75rem 0.75rem;
          border-color: #dddddd;
          align-items: stretch;
        }
        .ellipsis-text {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .relative-fill {
          position: relative;
          height: 100%;
        }
        .absolute-fill {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
        }
      `}</style>
    </>
  );
};

const EnhancedCollectionListItemMobile = React.memo(CollectionListItemMobile);

export default EnhancedCollectionListItemMobile;
