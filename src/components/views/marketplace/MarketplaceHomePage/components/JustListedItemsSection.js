import {Link} from 'react-router-dom';
import React from 'react';

import ForwardCircleArrowActive from 'theme/images/ForwardCircleArrow.Active.svg';

import {
  MarketplaceItemsGallery,
  MarketplaceSectionTitle,
} from '../../components';

const MAX_ITEM_COUNT = 4;

const JustListedItemsSection = ({
  className,
  items: allItems,
  categoriesPath,
}) => {
  const items = React.useMemo(() => allItems.slice(0, MAX_ITEM_COUNT), [
    allItems,
  ]);

  return (
    <div className={className}>
      <div className="flex items-center hide-child">
        <MarketplaceSectionTitle>Just Listed</MarketplaceSectionTitle>
        <Link className="ml3 child" to={categoriesPath}>
          <img alt="Arrow forward" src={ForwardCircleArrowActive} />
        </Link>
      </div>
      <MarketplaceItemsGallery className="mt3" items={items} />
      <style jsx>{`
        img {
          height: 1.75rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedJustListedItemsSection = React.memo(JustListedItemsSection);

export default EnhancedJustListedItemsSection;
