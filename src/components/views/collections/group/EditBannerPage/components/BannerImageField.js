import React, {useCallback, useState} from 'react';

import {ImageEditor, InputPrompt} from 'elements';
import {ReactComponent as CameraPlus} from 'theme/images/CameraPlus.svg';
import ImagesUtils from 'helpers/ImagesUtils';
import useCroppedImage from 'hooks/useCroppedImage';

const bannerImageLength = 200;
const defaultCrop = {
  x: 0,
  y: 0,
  width: bannerImageLength,
  height: bannerImageLength,
};

const BannerImageField = ({field, form}) => {
  // ref: ItemVariantsListingSelectImageModal
  const [editImageModalVisible, setEditImageModalVisible] = useState(false);
  const showEditImageModal = useCallback(() => {
    setEditImageModalVisible(true);
  }, []);
  const hideEditImageModal = useCallback(() => {
    setEditImageModalVisible(false);
  }, []);

  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [thumbnailCrop, setThumbnailCrop] = React.useState(defaultCrop);

  const localImageWithCrop = React.useMemo(
    () =>
      uploadedImage
        ? {
            image: uploadedImage,
            crop: thumbnailCrop,
          }
        : null,
    [uploadedImage, thumbnailCrop]
  );

  const croppedLocalImageUrl = useCroppedImage(localImageWithCrop);

  const croppedImageUrl = React.useMemo(() => {
    if (croppedLocalImageUrl) {
      return croppedLocalImageUrl;
    }

    return field.value
      ? ImagesUtils.getCroppedImageUrl(field.value, defaultCrop)
      : null;
  }, [croppedLocalImageUrl, field.value]);

  const handleChangeImage = useCallback((image) => {
    if (image) {
      image.preview = URL.createObjectURL(image);
    }

    setUploadedImage(image);
  }, []);

  const handleApplyCrop = useCallback((newThumbnailCrop) => {
    setThumbnailCrop((oldThumbnailCrop) =>
      oldThumbnailCrop === newThumbnailCrop
        ? oldThumbnailCrop
        : !newThumbnailCrop
        ? defaultCrop
        : newThumbnailCrop
    );
  }, []);

  const handleSaveImage = useCallback(() => {
    if (uploadedImage) {
      form.setFieldTouched(field.name, true);
      form.setFieldValue(field.name, {
        image: uploadedImage,
        thumbnail: {
          cropDetails: thumbnailCrop,
        },
      });
    }

    hideEditImageModal();
  }, [field.name, form, hideEditImageModal, thumbnailCrop, uploadedImage]);

  const deleteImage = useCallback(
    (e) => {
      e.stopPropagation();
      setUploadedImage(null);
      form.setFieldTouched(field.name, true);
      form.setFieldValue(field.name, {});
    },
    [field.name, form]
  );

  const reset = useCallback(() => {
    hideEditImageModal();
    setUploadedImage(null);
  }, [hideEditImageModal]);

  return (
    <>
      <div
        className="image-container br2 overflow-hidden"
        onClick={showEditImageModal}
      >
        {croppedImageUrl ? (
          <img src={croppedImageUrl} alt="Crop" />
        ) : (
          <CameraPlus className="camera-icon" />
        )}
        {croppedImageUrl && <div className="cross" onClick={deleteImage} />}
      </div>

      {editImageModalVisible && (
        <InputPrompt
          title={field?.value ? 'Edit Image' : 'Add image'}
          flexibleHeight
          onDismiss={reset}
          okButtonLabel="Save"
          okButtonClassName="bg-tint white"
          onOkButtonClick={handleSaveImage}
          cancelButtonLabel="Cancel"
          onCancelButtonClick={reset}
          titleClassName="mt6 mt0-ns mt6-is-safari-workaround"
        >
          <div className="flex-auto gray-600">
            <ImageEditor
              subtitle="Rotate or crop our banner image if desired."
              forBanner
              image={uploadedImage}
              thumbnailCrop={thumbnailCrop}
              onAddImage={handleChangeImage}
              onApplyCrop={handleApplyCrop}
              onChangeImage={handleChangeImage}
            />
          </div>
        </InputPrompt>
      )}
      <style>{`
        .section:not(:last-child) {
          border-bottom: 1px solid #e1e1e1;
        }
        .image-container {
          width: 144px;
          height: 144px;
          position: relative;
          border: 1px solid #dadada;
          cursor: pointer;
        }
        .image-container .camera-icon {
          width: 2.8125rem;
          position: absolute;
          top: calc(50% - 1rem);
          left: calc(50% - 1rem);
        }
        .cross {
          position: absolute;
          right: 8px;
          top: 8px;
          width: 16px;
          height: 16px;
          border-radius: 0.25rem;
          background-color: #ddd;
        }
        .cross:hover {
          opacity: 1;
        }
        .cross:before, .cross:after {
          position: absolute;
          top: 2px;
          left: 7px;
          content: ' ';
          height: 12px;
          width: 2px;
          background-color: #aaa;
        }
        .cross:before {
          transform: rotate(45deg);
        }
        .cross:after {
          transform: rotate(-45deg);
        }
      `}</style>
    </>
  );
};

export default React.memo(BannerImageField);
