import {sortBy, isEmpty} from 'lodash';
import {isNumeric} from 'helpers/numbers';

const getSharpImageUrl = ({path, cropDetails, size}) => {
  if (!path) {
    return '';
  }
  let reduceQuality = false;
  const edits = {
    extract: {},
    resize: {},
    flatten: {background: {r: 255, g: 255, b: 255}},
  };
  if (
    isNumeric(cropDetails?.x) &&
    isNumeric(cropDetails?.width) &&
    cropDetails.width > 0
  ) {
    edits.extract.left = Math.floor(cropDetails.x);
    edits.extract.width = Math.floor(cropDetails.width);
  }
  if (
    isNumeric(cropDetails?.y) &&
    isNumeric(cropDetails?.height) &&
    cropDetails.height > 0
  ) {
    edits.extract.top = Math.floor(cropDetails.y);
    edits.extract.height = Math.floor(cropDetails.height);
  }
  if (isNumeric(size?.height) && size.height > 0) {
    edits.resize.height = Math.floor(size.height);
    if (size.height <= 300) {
      reduceQuality = true;
    }
  }
  if (isNumeric(size?.width) && size.width > 0) {
    edits.resize.width = Math.floor(size.width);
    if (size.width <= 300) {
      reduceQuality = true;
    }
  }
  if (reduceQuality) {
    edits.jpeg = {quality: 45, progressive: true};
    edits.webp = {quality: 45};
  }
  Object.keys(edits).forEach((key) => isEmpty(edits[key]) && delete edits[key]);
  const payload = {
    edits,
    outputFormat: 'jpeg',
    bucket: process.env.REACT_APP_S3_UPLOAD_BUCKET,
    key: path,
  };
  const payloadJsonStr = JSON.stringify(payload);
  const payloadJsonB64 = Buffer.from(payloadJsonStr).toString('base64');
  const fullPath = `${process.env.REACT_APP_SHARP_PATH}${payloadJsonB64}`;
  return fullPath;
};

const ImagesUtils = {
  sortImages: (images) => sortBy(images, 'metadata.thumbnail.order'),
  getImageUrl: (image, size = null) =>
    getSharpImageUrl({
      path: image.upload_path,
      size,
    }),
  getCroppedImageUrl: (image, size) =>
    getSharpImageUrl({
      path: image.upload_path,
      cropDetails: image.metadata?.thumbnail?.cropDetails,
      size,
    }),
  getItemMainThumbnailUrl: (images, size, listingImageId) => {
    const listingImage = images.find(({id}) => id === listingImageId);
    const [mainImage] = ImagesUtils.sortImages(images);
    const image = listingImage || mainImage;

    return image ? ImagesUtils.getCroppedImageUrl(image, size) : null;
  },
};

export default ImagesUtils;
