import React from 'react';
import cx from 'classnames';

import MarketplaceItemsGalleryItem from './MarketplaceItemsGalleryItem';

const MarketplaceItemsGallery = ({className, items}) => (
  <div className={cx('cf', className)}>
    {items.map((item, idx) => (
      <div
        key={item.id}
        className={cx(
          'item-wrapper fl w-50 w-25-l',
          idx % 4 !== 0 && 'pl3-l',
          idx % 2 !== 0 && 'pl3 pl0-l',
          idx > 1 && 'pt3 pt0-l',
          idx > 3 && 'pt3-l'
        )}
      >
        <MarketplaceItemsGalleryItem item={item} />
      </div>
    ))}
    <style jsx>{`
      .item-wrapper {
        height: 18rem;
      }
    `}</style>
  </div>
);

const EnhancedMarketplaceItemsGallery = React.memo(MarketplaceItemsGallery);

export default EnhancedMarketplaceItemsGallery;
