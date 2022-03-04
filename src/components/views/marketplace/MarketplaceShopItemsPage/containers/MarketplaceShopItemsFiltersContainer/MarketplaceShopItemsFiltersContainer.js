import {useSelector} from 'react-redux';
import {useSuspenseQuery} from 'react-fetching-library';
import React from 'react';

import {createGetMarketplaceHomePageQuery} from 'queryCreators';

import {MarketplaceShopItemsFilters} from './components';

const MarketplaceShopItemsFiltersContainer = ({
  className,
  visible,
  selectedCatalogIds,
  selectedCategoryIds,
  onChangeSelectedCatalogIds,
  onChangeSelectedCategoryIds,
  onDismiss,
}) => {
  const organizationDataId = useSelector(state =>
    state.session.organization_data ? state.session.organization_data.id : null
  );

  const fetchMarketplaceHomePageQuery = React.useMemo(
    () =>
      createGetMarketplaceHomePageQuery({
        partnerId: organizationDataId,
      }),
    [organizationDataId]
  );
  const fetchMarketplaceHomePageQueryConfig = useSuspenseQuery(
    fetchMarketplaceHomePageQuery
  );

  return (
    <MarketplaceShopItemsFilters
      className={className}
      visible={visible}
      catalogs={fetchMarketplaceHomePageQueryConfig.payload.catalogs}
      categories={fetchMarketplaceHomePageQueryConfig.payload.categories}
      selectedCatalogIds={selectedCatalogIds}
      selectedCategoryIds={selectedCategoryIds}
      onChangeSelectedCatalogIds={onChangeSelectedCatalogIds}
      onChangeSelectedCategoryIds={onChangeSelectedCategoryIds}
      onDismiss={onDismiss}
    />
  );
};

const EnhancedMarketplaceShopItemsFiltersContainer = React.memo(
  MarketplaceShopItemsFiltersContainer
);

export default EnhancedMarketplaceShopItemsFiltersContainer;
