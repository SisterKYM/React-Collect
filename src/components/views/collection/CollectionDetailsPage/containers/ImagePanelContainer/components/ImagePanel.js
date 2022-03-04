import {generatePath, Link} from 'react-router-dom';
import {MdClose} from 'react-icons/md';
import PropTypes from 'prop-types';
import React from 'react';

import {AddImageIconText} from 'elements';
import {IMG_PREVIEW_PANEL_HEIGHT} from 'views/media/config';

const ImagePanel = ({
  className,
  locationState,
  userHasOrganization,
  src,
  onDelete,
  ownerId,
  collectionId,
}) => (
  <div className={`image-panel-container relative ${className}`}>
    {src && (
      <button
        id="image-panel-close-button"
        className="dn absolute top-1 right-1 pa1 lh0 br2 bg-gray-400 grow"
        onClick={onDelete}
      >
        <MdClose className="f4 white" />
      </button>
    )}
    <Link
      to={{
        pathname: generatePath(
          userHasOrganization
            ? '/media/:owner/:collection?/images/albums/'
            : '/media/:owner/:collection?/images/upload',
          {
            owner: ownerId,
            collection: collectionId,
          }
        ),
        state: locationState,
      }}
    >
      {src ? (
        <div className="image-panel-panel mb3 overflow-hidden br2 bg-white">
          <img alt="Collection" className="db w-100 h-auto br2" src={src} />
        </div>
      ) : (
        <div className="image-panel-panel-no-image flex mb3 justify-center items-center tc pointer ba b--gray-300 br2 bg-white">
          <AddImageIconText />
        </div>
      )}
    </Link>
    <style jsx>{`
      .image-panel-container:hover > #image-panel-close-button {
        display: block;
      }
      .image-panel-panel {
        // max-height: ${IMG_PREVIEW_PANEL_HEIGHT}px;
      }
      :global(.image-panel-panel-no-image) {
        height: ${IMG_PREVIEW_PANEL_HEIGHT}px;
      }
    `}</style>
  </div>
);

ImagePanel.propTypes = {
  src: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

const EnhancedImagePanel = React.memo(ImagePanel);

export default EnhancedImagePanel;
