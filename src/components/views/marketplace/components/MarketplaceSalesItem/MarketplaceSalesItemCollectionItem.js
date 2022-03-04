import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import CollectionPlaceholder from 'theme/images/CollectionPlaceholder.svg';
import ImagesUtils from 'helpers/ImagesUtils';
import getPixelsFromRems from 'helpers/getPixelsFromRems';

const MarketplaceSalesItemCollectionItem = ({collection}) => {
  const hasItemCount = typeof collection.itemCount === 'number';
  const hasImage = Boolean(
    collection.header || (collection.theme && collection.theme.image)
  );
  const imageSrc = React.useMemo(
    () =>
      hasImage
        ? ImagesUtils.getCroppedImageUrl(
            collection.header || collection.theme.image,
            {
              width: getPixelsFromRems(24),
              height: getPixelsFromRems(12),
            }
          )
        : CollectionPlaceholder,
    [collection, hasImage]
  );

  return (
    <li className="pa4 bg-white">
      <Link className="flex" target="_blank" to={`/c/${collection.slug}`}>
        <div
          className={cx(
            'image-wrapper flex relative justify-center items-center',
            !hasImage && 'bg-light-tint'
          )}
        >
          <img
            className={hasImage ? 'h-100' : 'h-75'}
            alt={`${collection.name} header`}
            src={imageSrc}
          />
        </div>
        <div className="flex flex-column ml4 justify-center">
          <div
            className={cx(
              'truncate mb2 f5 avenir-medium',
              hasItemCount ? 'tint' : 'gray-600'
            )}
          >
            {collection.name}
          </div>
          <Link
            className={cx(
              'f5 avenir-medium',
              hasItemCount ? 'gray-400' : 'tint'
            )}
            target="_blank"
            to={
              hasItemCount
                ? `/c/${collection.slug}`
                : `/collection/${collection.user_id}/${collection.id}/manage`
            }
          >
            {hasItemCount
              ? `${collection.itemCount} item${
                  collection.itemCount === 1 ? '' : 's'
                }`
              : 'Manage'}
          </Link>
        </div>
      </Link>
      <style jsx>{`
        .image-wrapper {
          width: 12rem;
          height: 6rem;
        }
      `}</style>
    </li>
  );
};

const EnhancedMarketplaceSalesItemCollectionItem = React.memo(
  MarketplaceSalesItemCollectionItem
);

export default EnhancedMarketplaceSalesItemCollectionItem;
