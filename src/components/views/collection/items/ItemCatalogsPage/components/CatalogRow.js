import React from 'react';
import ImagesUtils from 'helpers/ImagesUtils';

const CatalogRow = ({catalog}) => (
  <div className="flex h80 items-center ba b--gray-300 br2 overflow-hidden">
    <div
      className="h-100 cover"
      style={{
        backgroundImage:
          catalog.image && catalog.image.upload_path
            ? `url("${ImagesUtils.getImageUrl(catalog.image)}")`
            : undefined,
      }}
    />
    <div className="w-75 ph4 f5 dark-grey avenir-roman ">{catalog.name}</div>
    <style jsx>{`
      .h80 {
        height: 80px;
      }
      .cover {
        width: 16%;
        background-repeat: no-repeat;
      }
    `}</style>
  </div>
);

const EnhancedCatalogRow = React.memo(CatalogRow);

export default EnhancedCatalogRow;
