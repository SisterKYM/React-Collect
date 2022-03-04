import React from 'react';
import cx from 'classnames';
import posed, {PoseGroup} from 'react-pose';
import useOnClickOutside from 'use-onclickoutside';

import MarketplaceShopItemsFilterList from './MarketplaceShopItemsFilterList';

const AnimatedMarketplaceShopItemsFiltersWrapper = posed.div({
  enter: {
    x: 0,
    delayChildren: 150,
    staggerChildren: 30,
  },
  exit: {
    x: '-100%',
    delay: 200,
    staggerChildren: 30,
  },
});

const MarketplaceShopItemsFilters = ({
  className,
  visible,
  catalogs,
  categories,
  selectedCatalogIds,
  selectedCategoryIds,
  onChangeSelectedCatalogIds,
  onChangeSelectedCategoryIds,
  onDismiss,
}) => {
  const containerRef = React.useRef(null);

  useOnClickOutside(containerRef, onDismiss);

  const parsedCategories = React.useMemo(
    () =>
      categories.map(categoryName => ({
        id: categoryName,
        name: categoryName,
      })),
    [categories]
  );

  return (
    <PoseGroup>
      {visible && (
        <AnimatedMarketplaceShopItemsFiltersWrapper
          ref={containerRef}
          className={cx('bg-white br bb b--gray-300', className)}
          key="marketplace-shop-items-filters"
        >
          <MarketplaceShopItemsFilterList
            className="bb b--gray-300"
            title="Collections"
            items={catalogs}
            selectedItemIds={selectedCatalogIds}
            onChangeSelectedItemIds={onChangeSelectedCatalogIds}
          />
          <MarketplaceShopItemsFilterList
            title="Categories"
            items={parsedCategories}
            selectedItemIds={selectedCategoryIds}
            onChangeSelectedItemIds={onChangeSelectedCategoryIds}
          />
        </AnimatedMarketplaceShopItemsFiltersWrapper>
      )}
    </PoseGroup>
  );
};

const EnahncedMarketplaceShopItemsFilters = React.memo(
  MarketplaceShopItemsFilters
);

export default EnahncedMarketplaceShopItemsFilters;
