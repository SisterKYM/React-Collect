import shortid from 'shortid';

const getCroppedImage = (image, pixelCrop) => {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // change non-opaque pixels to white
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const {data} = imgData;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 255) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imgData, 0, 0);

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve({
        name: `${shortid.generate()}.jpg`,
        preview: URL.createObjectURL(blob),
        ...blob,
      });
    }, image.type || 'image/jpeg');
  });
};

export default getCroppedImage;
