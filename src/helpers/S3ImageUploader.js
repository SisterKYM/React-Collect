import axios from 'axios';
import queryString from 'query-string';
import shortid from 'shortid';

import {apiClient} from 'helpers';
import {isNumeric} from 'helpers/numbers';

const base64ToUploadableData = (dataUri) => {
  const base64Data = dataUri.split(',')[1];
  const binary = window.atob(base64Data);

  return new Uint8Array(
    binary.split('').map((char, idx) => binary.charCodeAt(idx))
  );
};

const uploadImageToS3 = async ({
  signedUrl,
  image,
  contentType,
  contentEncoding,
}) => {
  try {
    const res = await axios
      .create({
        withCredentials: false,
      })
      .put(
        signedUrl,
        image,
        {
          headers: {
            'Content-Type': contentType,
            ...(contentEncoding ? {'Content-Encoding': contentEncoding} : {}),
            'x-amz-acl': 'public-read',
          },
        },
        {
          withCredentials: false,
          timeout: 10000,
        }
      );
    const imageUrlParsed = queryString.parseUrl(res.request.responseURL);

    return imageUrlParsed.url;
  } catch (err) {
    return undefined;
  }
};

const geneateObjectName = ({prefixes = [], image}) =>
  `${shortid.generate()}-${prefixes.join('-')}${
    image.name ? `-${image.name.replace(/[^\s\w.]/gi, '')}` : ''
  }`;

const getSignedUrl = async ({parentPath, objectName, thumbnail, image}) => {
  const res = await apiClient.post(`${parentPath}/signed_upload_url`, {
    objectName,
    metadata: {
      contentType: image.type,
      thumbnail,
    },
  });

  return res.data;
};

const createImageRecord = async ({
  parentPath,
  objectName,
  uploadPath,
  thumbnail,
  image,
}) => {
  const res = await apiClient.post(`${parentPath}/create_image_record`, {
    objectName,
    upload_path: uploadPath,
    metadata: {
      contentType: image.type,
      thumbnail,
    },
  });

  return res.data;
};

const updateImageRecord = async ({parentPath, thumbnail, imageId, image}) => {
  const res = await apiClient.patch(
    `${parentPath}/update_image_record/${imageId}`,
    {
      metadata: {
        contentType: image.type,
        thumbnail,
      },
    }
  );

  return res.data;
};

const S3ImageUploader = {
  uploadProfileImage: async ({image, thumbnail}) => {
    const objectName = geneateObjectName({prefixes: ['profile'], image});
    const parentPath = 'user';

    try {
      const {uploadPath, signedUrl} = await getSignedUrl({
        parentPath,
        objectName,
        thumbnail,
        image,
      });

      await uploadImageToS3({
        signedUrl,
        image,
        contentType: image.type,
      });

      return createImageRecord({
        parentPath,
        objectName,
        uploadPath,
        thumbnail,
        image,
      });
    } catch (err) {
      return undefined;
    }
  },
  uploadCollectionImage: async ({tabId, image, thumbnail}) => {
    const objectName = geneateObjectName({prefixes: [tabId], image});
    const parentPath = `users/tabs/${tabId}`;

    try {
      const {uploadPath, signedUrl} = await getSignedUrl({
        parentPath,
        objectName,
        thumbnail,
        image,
      });

      await uploadImageToS3({
        signedUrl,
        image,
        contentType: image.type,
      });

      const res = await apiClient.post(`users/headers`, {
        objectName,
        upload_path: uploadPath,
        metadata: {
          contentType: image.type,
          thumbnail,
        },
      });

      return res.data;
    } catch (err) {
      return undefined;
    }
  },
  uploadCollectionLogo: async ({tabId, image, thumbnail}) => {
    const objectName = geneateObjectName({prefixes: [tabId], image});
    const parentPath = `users/tabs/${tabId}`;

    try {
      const {uploadPath, signedUrl} = await getSignedUrl({
        parentPath,
        objectName,
        thumbnail,
        image,
      });

      await uploadImageToS3({
        signedUrl,
        image,
        contentType: image.type,
      });

      return createImageRecord({
        parentPath,
        objectName,
        uploadPath,
        thumbnail,
        image,
      });
    } catch (err) {
      return undefined;
    }
  },
  uploadCollectionItemImage: async ({
    imageId,
    tabId,
    itemId,
    image,
    thumbnail,
  }) => {
    const objectName = geneateObjectName({prefixes: [tabId, itemId], image});
    const parentPath = `users/tabs/${tabId}/items/${itemId}`;

    try {
      if (imageId && isNumeric(imageId)) {
        return updateImageRecord({
          parentPath,
          thumbnail,
          imageId,
          image,
        });
      }
      const {uploadPath, signedUrl} = await getSignedUrl({
        parentPath,
        objectName,
        thumbnail,
        image,
      });

      await uploadImageToS3({
        signedUrl,
        image,
        contentType: image.type,
      });

      return createImageRecord({
        parentPath,
        objectName,
        uploadPath,
        thumbnail,
        image,
      });
    } catch (err) {
      return undefined;
    }
  },
  deleteCollectionItemImage: async ({id, collectionId, itemId}) =>
    apiClient.delete(
      `users/tabs/${collectionId}/items/${itemId}/delete_image/${id}`
    ),
  uploadSignatureBase64: async (
    {dataUri, objectName, contentType},
    {collectionSlug, cartUuid}
  ) => {
    const getCartSignedUrl = async () => {
      const res = await apiClient.post(
        `collections/${collectionSlug}/carts/${cartUuid}/sign`,
        {
          objectName: encodeURIComponent(objectName),
          contentType,
        }
      );

      return res.data.signedUrl;
    };

    try {
      const signedUrl = await getCartSignedUrl();
      const image = base64ToUploadableData(dataUri);

      return uploadImageToS3({
        signedUrl,
        image,
        contentType,
        contentEncoding: 'base64',
      });
    } catch (err) {
      return undefined;
    }
  },
  uploadBannerImage: async ({image, thumbnail}) => {
    const objectName = geneateObjectName({prefixes: ['banner'], image});
    const parentPath = 'user';

    try {
      const {uploadPath, signedUrl} = await getSignedUrl({
        parentPath,
        objectName,
        thumbnail,
        image,
      });

      await uploadImageToS3({
        signedUrl,
        image,
        contentType: image.type,
      });

      return createImageRecord({
        parentPath,
        objectName,
        uploadPath,
        thumbnail,
        image,
      });
    } catch (err) {
      return undefined;
    }
  },
};

export default S3ImageUploader;
