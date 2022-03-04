const getFileNameFromUrl = url =>
  typeof url === 'string'
    ? url.slice(url.lastIndexOf('/') + 1)
    : 'Unknown file';

export default getFileNameFromUrl;
