import React from 'react';
import {change} from 'redux-form';
import {useDispatch} from 'react-redux';
import cx from 'classnames';

import {ImageEditor, InputPrompt} from 'elements';
import ImagesUtils from 'helpers/ImagesUtils';

import {ITEM_FORM_DETAILS_NAME} from '../../../ItemFormDetails';

const ItemVariantsListingSelectImageModal = ({fieldName, item, onDismiss}) => {
  const dispatch = useDispatch();

  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [thumbnailCrop, setThumbnailCrop] = React.useState(null);
  const [selectedImageId, setSelectedImageId] = React.useState(null);

  const handleChangeImage = React.useCallback(image => {
    if (image) {
      image.preview = URL.createObjectURL(image);
    }

    setSelectedImageId(null);
    setThumbnailCrop(null);
    setUploadedImage(image);
  }, []);

  const handleSave = React.useCallback(async () => {
    dispatch(
      change(ITEM_FORM_DETAILS_NAME, `${fieldName}.imageId`, selectedImageId)
    );
    dispatch(
      change(
        ITEM_FORM_DETAILS_NAME,
        `${fieldName}.localImage`,
        selectedImageId
          ? null
          : uploadedImage
          ? {
              image: uploadedImage,
              thumbnail: {
                cropDetails: thumbnailCrop,
              },
            }
          : null
      )
    );

    onDismiss();
  }, [
    dispatch,
    fieldName,
    onDismiss,
    selectedImageId,
    thumbnailCrop,
    uploadedImage,
  ]);

  return (
    <InputPrompt
      title={
        !item || item.images.length === 0 ? 'Add Image' : 'Select variant image'
      }
      flexibleHeight
      onDismiss={onDismiss}
      okButtonLabel="Save"
      okButtonClassName="bg-tint white"
      onOkButtonClick={handleSave}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onDismiss}
    >
      <div className="flex-auto gray-600">
        <ImageEditor
          subtitle={
            <>
              Shows initial thumbnail view.
              <br />
              Payers can click to see full image.
            </>
          }
          image={uploadedImage}
          thumbnailCrop={thumbnailCrop}
          onAddImage={handleChangeImage}
          onChangeImage={handleChangeImage}
          onApplyCrop={setThumbnailCrop}
        />
        {item && item.images.length !== 0 && (
          <div className="cf">
            {item.images.map(image => {
              const handleClickImage = () => {
                setSelectedImageId(prevSelectedImageId =>
                  prevSelectedImageId === image.id ? null : image.id
                );
                setUploadedImage(null);
              };

              return (
                <div key={image.id} className="fl w-third pa2">
                  <img
                    className={cx(
                      'ba pointer',
                      image.id === selectedImageId
                        ? 'bw2 b--tint'
                        : 'b--gray-300'
                    )}
                    alt="Thumbnail"
                    src={ImagesUtils.getCroppedImageUrl(image, {
                      width: 208,
                      height: 208,
                    })}
                    onClick={handleClickImage}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </InputPrompt>
  );
};

const EnhancedItemVariantsListingSelectImageModal = React.memo(
  ItemVariantsListingSelectImageModal
);

export default EnhancedItemVariantsListingSelectImageModal;
