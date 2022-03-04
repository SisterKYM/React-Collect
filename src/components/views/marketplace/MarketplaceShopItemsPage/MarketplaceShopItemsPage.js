import React from 'react';
import queryString from 'query-string';

import {
  MarketplaceItemsGalleryContainer,
  MarketplaceShopItemsFiltersContainer,
} from './containers';
import {MarketplacePageContainer} from '../containers';
import {MarketplacePageContentContainer} from '../components';
import {
  MarketplaceShopItemsFilterBar,
  MarketplaceShopItemsFiltersOverview,
} from './components';

const MarketplaceShopItemsPage = ({history, location}) => {
  const [sortBy, setSortBy] = React.useState({
    sort: 'created_at',
    direction: 'desc',
  });
  const [filtersVisible, setFiltersVisible] = React.useState(false);
  const [selectedCatalogIds, setSelectedCatalogIds] = React.useState(
    (location.state && location.state.catalogIds) || []
  );
  const [selectedCategoryIds, setSelectedCategoryIds] = React.useState([]);

  const searchKeyword = React.useMemo(
    () => queryString.parse(location.search).searchKeyword,
    [location.search]
  );

  const handleClickFilters = React.useCallback(() => {
    setFiltersVisible(prevFiltersVisible => !prevFiltersVisible);
  }, []);

  const handleDismissFilters = React.useCallback(() => {
    setFiltersVisible(false);
  }, []);

  return (
    <MarketplacePageContainer
      location={location}
      history={history}
      subheader={
        <MarketplaceShopItemsFilterBar
          sortBy={sortBy}
          filtersCount={selectedCatalogIds.length + selectedCategoryIds.length}
          onChangeSortBy={setSortBy}
          onClickFilters={handleClickFilters}
        />
      }
    >
      <MarketplaceShopItemsFiltersOverview
        catalogIds={selectedCatalogIds}
        categoryIds={selectedCategoryIds}
        onChangeCatalogIds={setSelectedCatalogIds}
        onChangeCategoryIds={setSelectedCategoryIds}
      />
      <div className="relative flex-auto">
        <MarketplaceShopItemsFiltersContainer
          className="absolute top-0 bottom-0"
          visible={filtersVisible}
          searchKeyword={searchKeyword}
          selectedCatalogIds={selectedCatalogIds}
          selectedCategoryIds={selectedCategoryIds}
          onChangeSelectedCatalogIds={setSelectedCatalogIds}
          onChangeSelectedCategoryIds={setSelectedCategoryIds}
          onDismiss={handleDismissFilters}
        />
        <MarketplacePageContentContainer>
          <MarketplaceItemsGalleryContainer
            searchKeyword={searchKeyword}
            sortBy={sortBy}
            selectedCatalogIds={selectedCatalogIds}
            selectedCategoryIds={selectedCategoryIds}
          />
        </MarketplacePageContentContainer>
      </div>
    </MarketplacePageContainer>
  );
};

const EnhancedMarketplaceShopItemsPage = React.memo(MarketplaceShopItemsPage);

export default EnhancedMarketplaceShopItemsPage;
