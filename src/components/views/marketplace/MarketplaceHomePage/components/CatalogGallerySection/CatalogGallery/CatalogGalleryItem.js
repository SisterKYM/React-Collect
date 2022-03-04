import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import CollectionImageIcon from 'theme/images/CollectionImageIcon.svg';
import ImagesUtils from 'helpers/ImagesUtils';

const CatalogGalleryItem = ({className, catalog}) => {
  const imageSrc = React.useMemo(
    () =>
      catalog.logo
        ? ImagesUtils.getCroppedImageUrl(catalog.logo)
        : CollectionImageIcon,
    [catalog.logo]
  );

  return (
    <Link
      className={cx('h-100', className)}
      to={{
        pathname: '/marketplace/shop-items',
        state: {
          catalogIds: [catalog.id],
        },
      }}
    >
      <div className="fl flex flex-column w-50 h-100 justify-center ws-normal bg-white">
        <h5 className="mh3 avenir-roman gray-600">{catalog.name}</h5>
      </div>
      <div className="catalog-image fl w-50 h-100 bg-center bg-white cover" />
      <style jsx>{`
        h5 {
          font-size: 1.3125rem;
        }
        .catalog-image {
          background-image: url("${imageSrc}");
        }
      `}</style>
    </Link>
  );
};

const EnhancedCatalogGalleryItem = React.memo(CatalogGalleryItem);

export default EnhancedCatalogGalleryItem;
