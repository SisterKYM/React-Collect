import {useFetcher} from 'rest-hooks';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import React from 'react';

import CollectionResource from 'resources/CollectionResource';
import ImagesUtils from 'helpers/ImagesUtils';
import useCroppedImage from 'hooks/useCroppedImage';

import {ImagePanel} from './components';

const ImagePanelContainer = ({
  className,
  ownerId,
  collection,
  header,
  localUploadedImage,
}) => {
  const history = useHistory();
  const location = useLocation();
  const croppedLocalImageUrl = useCroppedImage(localUploadedImage);
  const userHasOrganization = useSelector(state =>
    Boolean(state.session.organization_data)
  );
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const imagePanelImageSrc = React.useMemo(() => {
    const image =
      collection && collection.theme_id
        ? _.get(collection, 'theme.image')
        : null;
    const headerImage = (header && header.image) || null;

    return (
      croppedLocalImageUrl ||
      (image || headerImage
        ? ImagesUtils.getCroppedImageUrl(headerImage || image)
        : null)
    );
  }, [collection, header, croppedLocalImageUrl]);

  return (
    <ImagePanel
      className={className}
      userHasOrganization={userHasOrganization}
      src={imagePanelImageSrc}
      locationState={location.state}
      isPro={collection && collection.is_pro}
      ownerId={ownerId}
      collectionId={collection ? collection.id : null}
      onDelete={async () => {
        if (!collection) {
          history.replace(location.pathname, {
            ...location.state,
            image: null,
            headerId: null,
          });
        } else {
          history.replace(location.pathname, {
            ...location.state,
            image: null,
            headerId: null,
          });
          await updateCollection(
            {id: collection.id},
            {theme_id: null, theme: null}
          );
        }
      }}
    />
  );
};

export default ImagePanelContainer;
