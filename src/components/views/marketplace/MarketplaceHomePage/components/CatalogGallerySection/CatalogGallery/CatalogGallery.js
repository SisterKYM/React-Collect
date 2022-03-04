import Carousel from 'nuka-carousel';
import React from 'react';
import _ from 'lodash';

import {StatefulView} from 'elements';

import CatalogGalleryItem from './CatalogGalleryItem';

const renderCatalogGalleryItems = ([firstCatalog, secondCatalog]) => (
  <React.Fragment
    key={
      secondCatalog ? `${firstCatalog.id}-${secondCatalog.id}` : firstCatalog.id
    }
  >
    <CatalogGalleryItem
      key={firstCatalog.id}
      className="gallery-item dib w-100 w-50-l pr3-l pt3 pt0-l"
      catalog={firstCatalog}
    />
    {secondCatalog && (
      <CatalogGalleryItem
        key={secondCatalog.id}
        className="gallery-item dib w-100 w-50-l pr3-l pt3 pt0-l"
        catalog={secondCatalog}
      />
    )}
  </React.Fragment>
);

const CatalogGallery = ({catalogs, page, onChangePage}) => {
  const chunkedCatalogs = React.useMemo(() => _.chunk(catalogs, 2), [catalogs]);

  const handleBeforeSlide = React.useCallback(
    (_prevSlide, nextSlide) => {
      onChangePage(nextSlide);
    },
    [onChangePage]
  );

  return (
    <>
      <StatefulView
        className="mt3 gallery-container"
        resultCount={chunkedCatalogs.length}
      >
        <Carousel
          withoutControls
          slideIndex={page}
          heightMode="current"
          beforeSlide={handleBeforeSlide}
        >
          {chunkedCatalogs.map((x) => renderCatalogGalleryItems(x))}
        </Carousel>
      </StatefulView>
      <style jsx>{`
        :global(.gallery-item) {
          height: 12rem;
        }
        :global(.gallery-container, .gallery-container *) {
          max-height: 12rem;
        }
      `}</style>
    </>
  );
};

const EnhancedCatalogGallery = React.memo(CatalogGallery);

export default EnhancedCatalogGallery;
