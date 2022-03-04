import React from 'react';
import cx from 'classnames';

import {currency} from 'helpers/numbers';

const MarketplaceItemsGalleryItemPriceBlock = ({className, item}) => (
  <div className={cx('ph3 pv2 lh-copy bg-tint', className)}>
    {typeof item.retailPrice === 'number' && item.retailPrice > 0 && (
      <div className="f-small avenir-roman strike white o-50">
        {currency(item.retailPrice)}
      </div>
    )}
    <div className="f-small avenir-roman white">
      {item.amount === null ? '$Open' : currency(item.amount)}
    </div>
  </div>
);

const EnhancedMarketplaceItemsGalleryItemPriceBlock = React.memo(
  MarketplaceItemsGalleryItemPriceBlock
);

export default EnhancedMarketplaceItemsGalleryItemPriceBlock;
