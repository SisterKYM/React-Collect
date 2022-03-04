import 'react-image-crop/dist/ReactCrop.css';
import {generatePath} from 'react-router-dom';
import ImageCropper, {makeAspectCrop} from 'react-image-crop';
import React from 'react';

import {breakpoints, colors} from 'theme/constants';
import {Button} from 'elements';
import {FullOverlayLayout} from 'layout';
import {IMG_PREVIEW_PANEL_HEIGHT} from 'views/media/config';

const ASPECT = breakpoints.small / IMG_PREVIEW_PANEL_HEIGHT;
const INITIAL_PIXEL_CROP = {
  x: 0,
  y: 0,
  width: breakpoints.small,
  height: IMG_PREVIEW_PANEL_HEIGHT,
};

const ImageCropPage = ({history, match, location}) => {
  const pixelCropRef = React.useRef(INITIAL_PIXEL_CROP);

  const [crop, setCrop] = React.useState({});

  const image = React.useMemo(
    () => (location.state && location.state.image) || null,
    [location.state]
  );
  const imageUri = React.useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image]
  );

  React.useEffect(() => {
    if (!image) {
      const path = generatePath('/media/:owner/:collection?/images/upload', {
        owner: match.params.owner,
        collection: match.params.collection,
      });

      history.push(path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  React.useEffect(
    () => () => {
      if (imageUri) {
        URL.revokeObjectURL(imageUri);
      }
    },
    [imageUri]
  );

  const dismissPath = generatePath('/collection/:owner/:collection?/details', {
    owner: match.params.owner,
    collection: match.params.collection,
  });

  const backPath = generatePath('/media/:owner/:collection?/images/upload', {
    owner: match.params.owner,
    collection: match.params.collection,
  });

  const handleChangeCrop = React.useCallback((crop, pixelCrop) => {
    setCrop(crop);
    pixelCropRef.current = pixelCrop;
  }, []);

  const handleImageLoaded = React.useCallback((image) => {
    const crop = makeAspectCrop(
      {aspect: ASPECT, x: 0, y: 0, width: 100},
      image.naturalWidth / image.naturalHeight
    );

    setCrop(crop);

    pixelCropRef.current = {
      x: Math.floor((crop.x / 100) * image.naturalWidth),
      y: Math.floor((crop.y / 100) * image.naturalHeight),
      width: Math.floor((crop.width / 100) * image.naturalWidth),
      height: Math.floor((crop.height / 100) * image.naturalHeight),
    };
  }, []);

  const handleSubmit = React.useCallback(() => {
    history.push(dismissPath, {
      image: {
        image,
        crop: pixelCropRef.current,
      },
    });
  }, [history, image, dismissPath]);

  return (
    <FullOverlayLayout
      close={{
        color: colors.black,
        to: dismissPath,
      }}
      fixedBottom={
        <div className="flex pa3 bottom-bar-with-button justify-end items-center">
          <Button
            backgroundColorSet
            onClick={() => history.push(backPath)}
            className="w4 mr2 bg-gray-250 dark-grey"
          >
            Cancel
          </Button>
          <Button
            backgroundColorSet
            className="w4 bg-brand"
            onClick={handleSubmit}
          >
            Select
          </Button>
        </div>
      }
    >
      <div className="pa3 pa4-ns">
        <div className="pb3 mb4 bb b--gray-300">
          <h1 className="f3 dark-grey">Crop Image</h1>
        </div>
        <div className="cf ph2-ns crop-image-wrapper">
          <div className="fl w-100 tc pa2">
            {imageUri && (
              <ImageCropper
                style={{maxWidth: breakpoints.small}}
                imageStyle={{
                  display: 'block',
                  height: 'auto',
                }}
                src={imageUri}
                crop={crop}
                onChange={handleChangeCrop}
                onImageLoaded={handleImageLoaded}
              />
            )}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .ReactCrop__image {
          max-height: unset !important;
        }
        .crop-image-wrapper {
          max-width: 850px;
          margin: 0 auto;
        }
        .bottom-bar-with-button {
          border-top: 1px solid #dedede;
        }
      `}</style>
    </FullOverlayLayout>
  );
};

const EnhancedImageCropPage = React.memo(ImageCropPage);

export default EnhancedImageCropPage;
