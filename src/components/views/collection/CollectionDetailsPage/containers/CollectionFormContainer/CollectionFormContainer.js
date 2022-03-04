import {compose} from 'recompose';
import {useDispatch, useSelector} from 'react-redux';
import {useFetcher, useInvalidator} from 'rest-hooks';
import {useHistory, useLocation} from 'react-router-dom';
import _ from 'lodash';
import React, {useMemo} from 'react';

import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import CollectionResource from 'resources/CollectionResource';
import S3ImageUploader from 'helpers/S3ImageUploader';
import useCroppedImage from 'hooks/useCroppedImage';

import {CollectionForm} from './components';

const CollectionFormContainer = (
  {
    collection,
    ownerId,
    localUploadedImage,
    header,
    onStartSave,
    onEndSave,
    onDidSave,
  },
  ref
) => {
  const history = useHistory();
  const location = useLocation();

  const createCollection = useFetcher(CollectionResource.createShape());
  const invalidate = useInvalidator(CollectionResource.listShape());
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const dispatch = useDispatch();

  const localUploadedLogo = location.state?.logo || null;
  const croppedLocalLogoUrl = useCroppedImage(localUploadedLogo);

  const browser = useSelector((state) => state.browser);
  const isOrg = useSelector((state) =>
    _.get(state.session, 'partnerMaster.isOrg', false)
  );

  const handleDeleteLogo = React.useCallback(
    (event) => {
      event.preventDefault();

      if (localUploadedLogo) {
        history.replace(location.pathname, {
          ...location.state,
          logo: null,
        });
      } else {
        updateCollection({id: collection.id}, {logo_id: null});
      }
    },
    [history, location, localUploadedLogo, updateCollection, collection]
  );

  const queryParams = useMemo(() => {
    const queryParamsString = location.search.slice(1);
    const params = {};
    queryParamsString.split('&').forEach((queryParamString) => {
      params[queryParamString.split('=')[0]] = queryParamString.split('=')[1];
    });

    return params;
  }, [location]);

  const handleSubmit = React.useCallback(
    async (data) => {
      const getThemePayload = async (collectionId) => {
        if (localUploadedImage) {
          const uploadedImage = await S3ImageUploader.uploadCollectionImage({
            tabId: collectionId,
            image: localUploadedImage.image,
            thumbnail: {
              cropDetails: localUploadedImage.crop || {},
            },
          });

          return {
            theme_id: uploadedImage.id,
          };
        }

        if (header) {
          return {
            theme_id: header.id,
            theme: header,
          };
        }

        return {};
      };

      const getLogoPayload = async (collectionId) => {
        if (localUploadedLogo) {
          const uploadedLogo = await S3ImageUploader.uploadCollectionLogo({
            tabId: collectionId,
            image: localUploadedLogo.image,
            thumbnail: {
              order: 0,
              cropDetails: localUploadedLogo.crop || {},
            },
          });

          return {
            logo_id: uploadedLogo.id,
          };
        }

        return {};
      };

      const saveCollection = collection ? updateCollection : createCollection;

      try {
        onStartSave();

        const savedCollection = await saveCollection(
          collection ? {id: collection.id} : undefined,
          {
            folder_id: queryParams.folderId,
            ...collection,
            ...data,
            owner: ownerId,
          }
        );
        invalidate({});

        const themePayload = await getThemePayload(savedCollection.id);
        const logoPayload = await getLogoPayload(savedCollection.id);

        await updateCollection(
          {id: savedCollection.id},
          {...themePayload, ...logoPayload}
        );
        onDidSave(savedCollection);
      } catch (err) {
        dispatch(clearAlerts());
        dispatch(
          errorAlert({
            title: 'Error',
            body: err.message,
          })
        );
      } finally {
        onEndSave();
      }
    },
    [
      collection,
      updateCollection,
      createCollection,
      localUploadedImage,
      header,
      localUploadedLogo,
      onStartSave,
      queryParams.folderId,
      ownerId,
      invalidate,
      onDidSave,
      dispatch,
      onEndSave,
    ]
  );

  return (
    <CollectionForm
      ref={ref}
      isOrg={isOrg}
      browser={browser}
      collection={_.omit(collection, 'theme_id')}
      localUploadedLogoSrc={croppedLocalLogoUrl}
      logoUploadPath={{
        pathname: `${location.pathname}/logo-upload`,
        state: location.state,
      }}
      initialValues={_.omit(collection, 'theme_id')}
      handleDeleteLogo={handleDeleteLogo}
      onSubmit={handleSubmit}
    />
  );
};

const enhance = compose(React.memo, React.forwardRef);

const EnhancedCollectionFormContainer = enhance(CollectionFormContainer);

export default EnhancedCollectionFormContainer;
