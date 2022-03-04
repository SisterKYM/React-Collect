import {useSelector} from 'react-redux';
import {useSuspenseQuery} from 'react-fetching-library';
import React from 'react';

import {createGetMarketplaceHomePageQuery} from 'queryCreators';
import {FiltersOverviewFilterItem} from 'elements';

const MarketplaceShopItemsFiltersOverview = ({
  catalogIds,
  categoryIds,
  onChangeCatalogIds,
  onChangeCategoryIds,
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

  const [catalogs, categories] = React.useMemo(
    () => [
      fetchMarketplaceHomePageQueryConfig.payload.catalogs.filter(catalog =>
        catalogIds.includes(catalog.id)
      ),
      fetchMarketplaceHomePageQueryConfig.payload.categories
        .filter(category => categoryIds.includes(category))
        .map(category => ({
          id: category,
          name: category,
        })),
    ],
    [
      catalogIds,
      categoryIds,
      fetchMarketplaceHomePageQueryConfig.payload.catalogs,
      fetchMarketplaceHomePageQueryConfig.payload.categories,
    ]
  );

  const renderItem = React.useCallback(
    (item, type) => {
      const handleClickCross = () => {
        if (type === 'CATALOG') {
          onChangeCatalogIds(
            catalogIds.filter(catalogId => catalogId !== item.id)
          );
        } else if (type === 'CATEGORY') {
          onChangeCategoryIds(
            categoryIds.filter(categoryId => categoryId !== item.id)
          );
        }
      };

      return (
        <FiltersOverviewFilterItem
          key={item.id}
          className="fl mr4"
          title={item.name}
          onClickCross={handleClickCross}
        />
      );
    },
    [catalogIds, categoryIds, onChangeCatalogIds, onChangeCategoryIds]
  );

  return catalogs.length !== 0 || categories.length !== 0 ? (
    <div className="cf ph3 pv2 bb b--gray-300 bg-white">
      {catalogs.map(catalog => renderItem(catalog, 'CATALOG'))}
      {categories.map(category => renderItem(category, 'CATEGORY'))}
    </div>
  ) : null;
};

const EnhancedMarketplaceShopItemsFiltersOverview = React.memo(
  MarketplaceShopItemsFiltersOverview
);

export default EnhancedMarketplaceShopItemsFiltersOverview;
