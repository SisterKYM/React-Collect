import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import ImagePlaceholder from 'theme/images/ImagePlaceholder.svg';
import ImagesUtils from 'helpers/ImagesUtils';

import MarketplaceItemsGalleryItemPriceBlock from './MarketplaceItemsGalleryItemPriceBlock';

const MarketplaceItemsGalleryItem = ({className, item}) => {
  const organizer = item.collection[0].organizer;
  const hasImage = item.images && item.images.length !== 0;
  const imageSrc = React.useMemo(
    () =>
      hasImage
        ? ImagesUtils.getItemMainThumbnailUrl(item.images, {
            width: 300,
          })
        : ImagePlaceholder,
    [hasImage, item.images]
  );

  return (
    <Link
      className={cx('flex flex-column w-100 h-100 bg-white', className)}
      target="_blank"
      to={`/c/${item.collection[0].slug}`}
    >
      <div
        className={cx(
          'image-container flex relative justify-center items-center w-100',
          !hasImage && 'bg-light-tint'
        )}
      >
        <img
          className={cx(
            'db',
            hasImage ? 'w-100 h-100' : 'image-placeholder h-auto'
          )}
          alt={item.name}
          src={imageSrc}
        />
        <MarketplaceItemsGalleryItemPriceBlock
          className="absolute top-0 right-0"
          item={item}
        />
      </div>
      <div className="details-container flex flex-column justify-between pa3">
        <div className="truncate f-small avenir-roman">{item.name}</div>
        <div className="truncate f-small i merriweather gray-400">
          {organizer.display_name || organizer.name}
        </div>
      </div>
      <style jsx>{`
        img {
          object-fit: cover;
          object-position: center;
        }
        .image-container {
          height: 70%;
        }
        .details-container {
          height: 30%;
        }
        .image-placeholder {
          width: 6rem;
        }
      `}</style>
    </Link>
  );
};

const EnhancedMarketplaceItemsGalleryItem = React.memo(
  MarketplaceItemsGalleryItem
);

export default EnhancedMarketplaceItemsGalleryItem;
