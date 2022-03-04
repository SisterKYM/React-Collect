import React from 'react';
import _ from 'lodash';

import {MarketplaceSectionTitle} from '../../../components';
import CatalogGallery from './CatalogGallery';
import GalleryArrowNavigation from './GalleryArrowNavigation';

const CatalogGallerySection = ({className, catalogs}) => {
  const [page, setPage] = React.useState(0);

  const sortedCatalogs = React.useMemo(
    () => _.orderBy(catalogs, ['display_order', 'id'], ['asc', 'desc']),
    [catalogs]
  );

  const handleGoForward = React.useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleGoBack = React.useCallback(() => {
    setPage((prevPage) => prevPage - 1);
  }, []);

  return (
    <div className={className}>
      <header className="flex justify-between items-center">
        <MarketplaceSectionTitle>
          Browse Latest Catalogs
        </MarketplaceSectionTitle>
        <GalleryArrowNavigation
          className="mr3-ns"
          forwardActive={sortedCatalogs.length - (page + 1) * 2 > 0}
          backActive={page !== 0}
          onGoForward={handleGoForward}
          onGoBack={handleGoBack}
        />
      </header>
      <CatalogGallery
        catalogs={sortedCatalogs}
        page={page}
        onChangePage={setPage}
      />
    </div>
  );
};

const EnhancedCatalogGallerySection = React.memo(CatalogGallerySection);

export default EnhancedCatalogGallerySection;
