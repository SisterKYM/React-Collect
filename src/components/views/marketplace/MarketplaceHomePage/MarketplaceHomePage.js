import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useSuspenseQuery} from 'react-fetching-library';
import React from 'react';

import {createGetMarketplaceHomePageQuery} from 'queryCreators';

import {
  CatalogGallerySection,
  JustListedItemsSection,
  NewSalesSection,
  HeaderSection,
} from './components';
import {MarketplacePageContainer} from '../containers';
import {MarketplacePageContentContainer} from '../components';

const MarketplaceHomePage = ({history, location}) => {
  const organizationData = useSelector((state) =>
    state.session.organization_data ? state.session.organization_data : null
  );

  const getMarketplaceHomePageQuery = React.useMemo(
    () =>
      createGetMarketplaceHomePageQuery({
        partnerId: organizationData ? organizationData.id : null,
      }),
    [organizationData]
  );
  const getMarketplaceHomePageQueryConfig = useSuspenseQuery(
    getMarketplaceHomePageQuery
  );

  return (
    <MarketplacePageContainer location={location} history={history}>
      {!getMarketplaceHomePageQueryConfig.error &&
        Boolean(getMarketplaceHomePageQueryConfig.payload) && (
          <MarketplacePageContentContainer>
            <HeaderSection className="mt1 mb4" />
            <CatalogGallerySection
              catalogs={getMarketplaceHomePageQueryConfig.payload.catalogs}
            />
            <NewSalesSection
              className="mt4"
              sales={getMarketplaceHomePageQueryConfig.payload.new_sales}
              salesPath="/marketplace/sales"
            />
            <Link
              className="db mt3 f-small avenir-medium"
              to="/marketplace/sales"
            >
              All Sales
            </Link>
            <JustListedItemsSection
              className="mt4"
              items={getMarketplaceHomePageQueryConfig.payload.just_listed.data}
              categoriesPath="/marketplace/shop-items"
            />
            <Link
              className="db mt3 f-small avenir-medium"
              to="/marketplace/shop-items"
            >
              All Items
            </Link>
          </MarketplacePageContentContainer>
        )}
    </MarketplacePageContainer>
  );
};

const EnhancedMarketplaceHomePage = React.memo(MarketplaceHomePage);

export default EnhancedMarketplaceHomePage;
