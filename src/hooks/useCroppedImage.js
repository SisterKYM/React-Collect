import React from 'react';

import getCroppedImage from 'helpers/getCroppedImage';

const useCroppedImage = imageWithCrop => {
  const [croppedImageUrl, setCroppedImageUrl] = React.useState(null);

  React.useEffect(() => {
    if (imageWithCrop) {
      const image = new Image();

      image.addEventListener('load', async () => {
        const croppedImage = await getCroppedImage(image, imageWithCrop.crop);

        setCroppedImageUrl(croppedImage.preview);
      });

      image.src = URL.createObjectURL(imageWithCrop.image);
    } else {
      setCroppedImageUrl(null);
    }

    return () => {
      if (croppedImageUrl) {
        URL.revokeObjectURL(croppedImageUrl);
      }
    };
  }, [imageWithCrop]); // eslint-disable-line react-hooks/exhaustive-deps

  return croppedImageUrl;
};

export default useCroppedImage;
