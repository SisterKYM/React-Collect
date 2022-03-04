import 'react-image-crop/dist/ReactCrop.css';
import ImageCrop from 'react-image-crop';
import React from 'react';

import {CommonButton} from 'elements';
import {ReactComponent as ImageCropIcon} from 'theme/images/ImageCrop.svg';
import {ReactComponent as ImageDeleteIcon} from 'theme/images/ImageDelete.svg';
import {ReactComponent as ImageRotateIcon} from 'theme/images/ImageRotate.svg';
import DragAndDropIcon from 'theme/images/DragandDrop.svg';
import ImageDropzone from 'elements/ImageDropzone';
import config from 'config';

const IMAGE_HEIGHT = 260;
const IMAGE_WIDTH = 400;

class ImageEditor extends React.PureComponent {
  state = {
    fullWidth: true,
    rotation: 0,
    cropping: false,
    crop: {
      aspect: 1,
      x: 0,
      y: 0,
    },
  };

  pixelCrop = null;

  handleClickContainer = (event) => {
    event.stopPropagation();
  };

  handleChangeCrop = (crop, pixelCrop) => {
    if (this.state.cropping) {
      this.pixelCrop = pixelCrop;

      this.setState({
        crop: {
          ...crop,
          aspect: 1,
        },
      });
    }
  };

  handleRotate = () => {
    const image = new Image();

    image.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      const imageWidth = image.width;
      const imageHeight = image.height;

      canvas.width = imageHeight;
      canvas.height = imageWidth;

      const context = canvas.getContext('2d');
      const angle = Math.PI / 2;
      context.translate(
        Math.abs(
          (imageWidth / 2) * Math.cos(angle) +
            (imageHeight / 2) * Math.sin(angle)
        ),
        Math.abs(
          (imageHeight / 2) * Math.cos(angle) +
            (imageWidth / 2) * Math.sin(angle)
        )
      );
      context.rotate(angle);
      context.translate(-image.width / 2, -image.height / 2);
      context.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        const file = new Blob([blob], {
          type: this.props.image.type,
          lastModified: image.lastModified,
        });
        file.reupload = true;
        file.preview = URL.createObjectURL(blob);

        this.props.onChangeImage(file);
        this.props.onApplyCrop(null);
      }, 'image/jpeg');

      context.restore();
    });

    image.src = this.props.image.preview;
  };

  handleImageLoaded = (image) => {
    const {thumbnailCrop} = this.props;
    const fullWidth = image.offsetHeight > image.offsetWidth;
    const initialCrop = thumbnailCrop
      ? {
          aspect: 1,
          x: (thumbnailCrop.x / image.naturalWidth) * 100,
          y: (thumbnailCrop.y / image.naturalHeight) * 100,
          width: (thumbnailCrop.width / image.naturalWidth) * 100,
          height: (thumbnailCrop.height / image.naturalHeight) * 100,
        }
      : null;
    const crop = initialCrop || {
      aspect: 1,
      x: fullWidth ? 0 : ((image.width - image.height) / 2 / image.width) * 100,
      y: fullWidth
        ? ((image.height - image.width) / 2 / image.height) * 100
        : 0,
      width: fullWidth ? 100 : (image.height / image.width) * 100,
      height: fullWidth ? (image.width / image.height) * 100 : 100,
    };
    this.pixelCrop = {
      x: Math.floor((crop.x / 100) * image.naturalWidth),
      y: Math.floor((crop.y / 100) * image.naturalHeight),
      width: Math.floor((crop.width / 100) * image.naturalWidth),
      height: Math.floor((crop.height / 100) * image.naturalHeight),
    };

    this.setState({fullWidth, crop});
    this.props.onApplyCrop(this.pixelCrop);
  };

  handleCrop = () => {
    this.setState({cropping: true});
  };

  handleClickCancelCrop = () => {
    this.setState({cropping: false});
  };

  handleClickApplyCrop = () => {
    this.props.onApplyCrop(this.pixelCrop);
    this.setState({cropping: false});
  };

  handleDelete = () => {
    this.props.onChangeImage(null);
  };

  renderEditImage = () => (
    <div className="edit-image-container ba b--gray-300">
      <div className="image-editor-image-container flex justify-center items-center">
        <ImageCrop
          keepSelection
          imageStyle={{
            ...(this.state.fullWidth
              ? {
                  maxHeight: IMAGE_HEIGHT,
                }
              : {
                  maxWidth: IMAGE_WIDTH,
                }),
            transform: `rotate(${this.state.rotation}deg)`,
            backgroundColor: 'white',
          }}
          disabled={!this.state.cropping}
          src={this.props.image.preview}
          crop={this.state.crop}
          onChange={this.handleChangeCrop}
          onImageLoaded={this.handleImageLoaded}
        />
      </div>
      <div className="flex items-center bg-gray-200">
        <div className="flex-auto ml2 mv2 f7 lh-copy avenir-roman">
          {this.state.cropping ? (
            !this.props.forBanner ? (
              'Set thumbnail view'
            ) : (
              ''
            )
          ) : (
            <>{this.props.subtitle}</>
          )}
        </div>
        {this.state.cropping ? (
          <div className="flex mr3 mv2 items-center">
            <CommonButton
              className="pt-14 mr2 bg-gray-400 white"
              onClick={this.handleClickCancelCrop}
            >
              Cancel
            </CommonButton>
            <CommonButton
              className="pt-14 bg-tint white"
              onClick={this.handleClickApplyCrop}
            >
              Apply
            </CommonButton>
          </div>
        ) : (
          <div className="flex flex-auto mv2 mr3 justify-between items-center">
            <ImageRotateIcon
              className="control-icon pointer"
              fill={config.colors.tint}
              onClick={this.handleRotate}
            />
            <ImageCropIcon
              className="control-icon pointer"
              fill={config.colors.tint}
              onClick={this.handleCrop}
            />
            <ImageDeleteIcon
              className="control-icon pointer"
              fill="none"
              stroke={config.colors.tint}
              onClick={this.handleDelete}
            />
          </div>
        )}
      </div>
      <style jsx>{`
        .edit-image-container {
          max-width: ${IMAGE_WIDTH}px;
        }
        :global(.control-icon) {
          width: 1.25rem;
        }
      `}</style>
    </div>
  );

  renderAddImage = () => (
    <ImageDropzone
      className="image-editor-image-container ba b--gray-300"
      onChange={this.props.onAddImage}
      onWillChange={this.props.onWillAddImage}
    >
      <img
        className="drag-and-drop-icon"
        alt="Drag and drop"
        src={DragAndDropIcon}
      />
      <div className="mv3 f-regular avenir-roman">Drag and drop</div>
      <CommonButton className="bg-tint pt-14 white">Upload Photo</CommonButton>
      <style jsx>{`
        .drag-and-drop-icon {
          width: 60px;
        }
      `}</style>
    </ImageDropzone>
  );

  render() {
    return (
      <div className={this.props.className} onClick={this.handleClickContainer}>
        {this.props.image ? this.renderEditImage() : this.renderAddImage()}
        <style jsx>{`
          :global(.image-editor-image-container) {
            max-width: ${IMAGE_WIDTH}px;
            height: ${IMAGE_HEIGHT}px;
          }
          :global(.ReactCrop--disabled .ReactCrop__crop-selection) {
            border-image-source: unset !important;
            border-image-slice: 0 !important;
            border: 0 !important;
          }
        `}</style>
      </div>
    );
  }
}

export default ImageEditor;
