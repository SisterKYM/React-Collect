import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {ItemViewPrice} from 'elements';
import ItemViewImagePlaceholderIcon from 'theme/images/item-view-image-placeholder.svg';
import ImagesUtils from 'helpers/ImagesUtils';
import checkDifferentRetailPricesOrAmounts from 'helpers/ItemViewPrice';

const ItemViewGridItem = ({className, highlighted, itemView, to}, ref) => {
  const hasImage = itemView.images.length !== 0;
  const lowestAmountListing = React.useMemo(
    () =>
      _.minBy(
        (itemView.options.variants &&
          itemView.options.variants.enabled &&
          itemView.options.variants.listings) ||
          [],
        'amount'
      ),
    [itemView]
  );
  const [withDifferentRetailPrices, withDifferentAmounts] = React.useMemo(
    () => checkDifferentRetailPricesOrAmounts(itemView),
    [itemView]
  );

  const soldOut =
    itemView.options.variants && itemView.options.variants.enabled
      ? Math.max(
          ...itemView.options.variants.listings.map(
            (listing) => listing.available_quantity
          )
        ) === 0
      : itemView.available_quantity === 0;

  return (
    <div ref={ref} className={className}>
      <Link
        className={cx(
          'item-view-grid-item-container flex flex-column overflow-hidden br2 ba grow bg-white',
          highlighted ? 'b--brand' : 'b--gray-300'
        )}
        to={to}
      >
        <div
          className={cx(
            'image-wrapper relative w-100',
            !hasImage && 'bg-light-gray'
          )}
        >
          <img
            className={cx('db absolute', hasImage ? 'w-100 h-100' : 'w4')}
            alt={itemView.name}
            src={
              hasImage
                ? ImagesUtils.getItemMainThumbnailUrl(itemView.images, {
                    width: 300,
                  })
                : ItemViewImagePlaceholderIcon
            }
          />
          {((!lowestAmountListing &&
            itemView.options.makeAvailableQuantityPublic &&
            itemView.available_quantity !== null) ||
            soldOut) && (
            <div
              className={cx(
                'absolute top-0 right-0 ph3 pv2 lh-copy br2 br--left br--bottom',
                soldOut ? 'bg-gray-400' : 'bg-tint'
              )}
            >
              <div className="f6 tc avenir-light white">
                {soldOut ? 'Sold Out' : `${itemView.available_quantity} Left`}
              </div>
            </div>
          )}
        </div>
        <div className="details-container flex flex-column flex-auto justify-between pa3">
          <h5 className="db truncate f6 lh-title merriweather gray-600">
            {itemView.name}
          </h5>
          {itemView.required && (
            <div className="f6 avenir-roman brand">Required</div>
          )}
          <ItemViewPrice
            itemView={itemView}
            listing={lowestAmountListing}
            withDifferentRetailPrices={withDifferentRetailPrices}
            withDifferentAmounts={withDifferentAmounts}
          />
        </div>
      </Link>
      <style jsx>{`
        img {
          object-fit: cover;
          object-position: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .image-wrapper {
          height: 0rem;
          padding-top: 100%;
        }
        .details-container {
          height: 6rem;
        }
        :global(.item-view-grid-item-container) {
          backface-visibility: visible !important;
        }
      `}</style>
    </div>
  );
};

const enhance = compose(React.memo, React.forwardRef);

const EnhancedItemViewGridItem = enhance(ItemViewGridItem);

export default EnhancedItemViewGridItem;
