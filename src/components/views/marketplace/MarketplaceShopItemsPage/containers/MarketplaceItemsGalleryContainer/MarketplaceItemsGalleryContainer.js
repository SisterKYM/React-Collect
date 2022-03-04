import {ThreeBounce} from 'better-react-spinkit';
import {Waypoint} from 'react-waypoint';
import {useSelector} from 'react-redux';
import React from 'react';

import {StatefulView} from 'elements';
import {createGetMarketplaceItemsQuery} from 'queryCreators';
import config from 'config';
import usePagination from 'hooks/usePagination';

import {
  MarketplaceItemsGallery,
  MarketplaceSectionTitle,
} from '../../../components';

const MarketplaceItemsGalleryContainer = ({
  searchKeyword,
  selectedCatalogIds,
  selectedCategoryIds,
  sortBy,
}) => {
  const organizationData = useSelector(state =>
    state.session.organization_data ? state.session.organization_data : null
  );

  const createQuery = React.useCallback(
    ({page, perPage}) =>
      createGetMarketplaceItemsQuery({
        sortBy,
        page,
        perPage,
        searchKeyword,
        partnerId: organizationData ? organizationData.id : null,
        catalogIds: selectedCatalogIds,
        categoryNames: selectedCategoryIds,
      }),
    [
      organizationData,
      searchKeyword,
      selectedCatalogIds,
      selectedCategoryIds,
      sortBy,
    ]
  );

  const {items, fetchMore, queryRes} = usePagination({createQuery}, [
    searchKeyword,
    selectedCatalogIds,
    selectedCategoryIds,
    sortBy,
  ]);

  return (
    <>
      <MarketplaceSectionTitle>Shop Items</MarketplaceSectionTitle>
      <StatefulView loading={queryRes.loading} resultCount={items.length}>
        {queryRes.payload && (
          <>
            <MarketplaceItemsGallery className="mt3" items={items} />
            {items.length < queryRes.payload.pagination.total && (
              <Waypoint onEnter={fetchMore}>
                <div className="flex w-100 pv4 justify-center">
                  <ThreeBounce gutter={12} color={config.colors.accent} />
                </div>
              </Waypoint>
            )}
          </>
        )}
      </StatefulView>
    </>
  );
};

const EnhancedMarketplaceItemsGalleryContainer = React.memo(
  MarketplaceItemsGalleryContainer
);

export default EnhancedMarketplaceItemsGalleryContainer;
