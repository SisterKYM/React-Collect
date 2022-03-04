import React from 'react';
import cx from 'classnames';

import {ReactComponent as CameraPlus} from 'theme/images/CameraPlus.svg';
import {ImageDropzone} from 'elements';
import {dragHandle} from 'theme/sortable';
import getCroppedImage from 'helpers/getCroppedImage';

class ItemImageThumbnail extends React.PureComponent {
  state = {
    croppedImage: null,
  };

  componentDidMount() {
    if (this.props.imageSrc) {
      this.updateCroppedImage(this.props.imageSrc);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.imageSrc &&
      (this.props.imageSrc !== prevProps.imageSrc ||
        this.props.crop !== prevProps.crop)
    ) {
      this.updateCroppedImage(this.props.imageSrc);
    } else if (!this.props.imageSrc) {
      this.setState({croppedImage: null});
    }
  }

  updateCroppedImage = imageSrc => {
    const image = new Image();

    image.addEventListener('load', async () => {
      const fullWidth = image.height > image.width;
      const croppedImage = await getCroppedImage(
        image,
        this.props.crop || {
          x: fullWidth ? 0 : (image.width - image.height) / 2,
          y: fullWidth ? (image.height - image.width) / 2 : 0,
          width: fullWidth ? image.width : image.height,
          height: fullWidth ? image.width : image.height,
        }
      );

      this.setState({croppedImage});
    });

    image.src = imageSrc;
  };

  render() {
    const {selected, onClick, onWillChangeImage, onChangeImage} = this.props;
    const {croppedImage} = this.state;
    const ContentContainer = croppedImage ? 'div' : ImageDropzone;

    return (
      <div
        className={cx(
          'item-image-thumbnail-container pa2',
          selected && 'bg-gray-200',
          Boolean(croppedImage) && dragHandle
        )}
        onClick={onClick}
      >
        <ContentContainer
          className={cx(
            'item-image-thumbnail-content-container mh2 mv2 center overflow-hidden pointer',
            !croppedImage && 'ba b--gray-300'
          )}
          disabled={Boolean(croppedImage)}
          onChange={onChangeImage}
          {...(croppedImage
            ? {}
            : {
                onWillChange: onWillChangeImage,
              })}
        >
          <div className="image-rel-wrapper">
            <div className="image-abs-wrapper">
              {croppedImage ? (
                <img
                  className="db w-100 bg-white"
                  alt="Cropped preview"
                  src={croppedImage.preview}
                />
              ) : (
                <CameraPlus className="camera-icon o-50 bg-white" />
              )}
            </div>
          </div>
        </ContentContainer>
        {this.props.main && (
          <div className="f7 tc avenir-light">Main Photo</div>
        )}
        <style jsx>{`
          .item-image-thumbnail-container {
            height: 9rem;
          }
          :global(.item-image-thumbnail-content-container) {
            width: 100%;
          }
          .image-rel-wrapper {
            width: 100%;
            padding-bottom: 100%;
            position: relative;
          }
          .image-abs-wrapper {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
          :global(.image-abs-wrapper > .camera-icon) {
            width: 2.8125rem;
            position: absolute;
            top: calc(50% - 1rem);
            left: calc(50% - 1rem);
          }
        `}</style>
      </div>
    );
  }
}

export default ItemImageThumbnail;
