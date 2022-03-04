import cx from 'classnames';
import Magnifier from 'react-magnifier';
import React from 'react';

import ImagesUtils from 'helpers/ImagesUtils';

const getListingImageIdx = (listing, orderedImages) => {
  const listingImageIdx = orderedImages.findIndex(
    ({id}) => id === listing.imageId
  );

  return listingImageIdx === -1 ? 0 : listingImageIdx;
};

const ItemViewImageGallery = ({className, listing, images}) => {
  const touchDeviceUsed = 'ontouchstart' in document.documentElement;
  const orderedImages = ImagesUtils.sortImages(images);
  const [selectedImageIdx, setSelectedImageIdx] = React.useState(
    () => (listing && getListingImageIdx(listing, orderedImages)) || 0
  );

  React.useEffect(() => {
    if (listing) {
      setSelectedImageIdx(getListingImageIdx(listing, orderedImages));
    }
  }, [listing]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={className}>
      <Magnifier
        className="item-view-image-magnifier"
        width="100%"
        mgWidth={200}
        mgHeight={200}
        src={ImagesUtils.getImageUrl(orderedImages[selectedImageIdx])}
      />
      {orderedImages.length > 1 && (
        <div className="cf mt3">
          {orderedImages.map((image, idx) => (
            <div
              key={image.id}
              className={cx(
                'fl w-third pa2 bg-animate hover-bg-light-gray',
                selectedImageIdx === idx && 'bg-light-gray'
              )}
            >
              <div
                className="ba b--gray-300 pointer"
                onClick={() => {
                  setSelectedImageIdx(idx);
                }}
              >
                <img
                  className="item-images-viewer-thumbnail db"
                  alt="Item thumbnail"
                  src={ImagesUtils.getCroppedImageUrl(image, {
                    width: 200,
                    height: 200,
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        img {
          width: 100%;
        }

        @media screen and (max-width: 30em) {
          :global(.item-view-image-magnifier) {
            pointer-events: ${touchDeviceUsed ? 'none' : 'unset'};
          }
        }
      `}</style>
    </div>
  );
};

const EnhancedItemViewImageGallery = React.memo(ItemViewImageGallery);

export default EnhancedItemViewImageGallery;
