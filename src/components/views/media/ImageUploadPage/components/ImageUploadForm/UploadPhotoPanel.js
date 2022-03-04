import React from 'react';

import {
  IMG_PREVIEW_PANEL_HEIGHT,
  IMG_PREVIEW_PANEL_WIDTH,
} from 'views/media/config';
import CameraIcon from 'theme/images/Camera.svg';

const UploadPhotoPanel = () => (
  <div className="upload-photo-panel-container flex flex-column mw-100 pa5 justify-center items-center ba b--gray-300 gray-400 br2 shadow-6">
    <img className="mb3" alt="Camera" src={CameraIcon} />
    Select a Banner Image
    <style jsx>{`
      .upload-photo-panel-container {
        height: ${IMG_PREVIEW_PANEL_HEIGHT}px;
        width: ${IMG_PREVIEW_PANEL_WIDTH}px;
      }
      img {
        height: 47px;
      }
    `}</style>
  </div>
);

const EnhancedUploadPhotoPanel = React.memo(UploadPhotoPanel);

export default EnhancedUploadPhotoPanel;
