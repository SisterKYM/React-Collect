import {useFetcher, useInvalidator, useResource} from 'rest-hooks';
import {useSelector} from 'react-redux';
import React from 'react';

import {LOGOUT} from 'redux/modules/session/constants';
import PublicCollectionResource from 'resources/PublicCollectionResource';
import useSessionStorage from 'hooks/useSessionStorage';

const usePublicCollection = ({collectionSlug}) => {
  const fetchedPublicCollection = useResource(
    PublicCollectionResource.detailShape(),
    {
      slug: collectionSlug,
    }
  );
  const updatePublicCollection = useFetcher(
    PublicCollectionResource.partialUpdateShape()
  );

  const [loading, setLoading] = React.useState(
    Boolean(fetchedPublicCollection.fields_required)
  );
  const [publicCollection, setPublicCollection] = React.useState(
    fetchedPublicCollection
  );
  const [visitorValue, setVisitorValue] = useSessionStorage(
    `VISITOR_KEY-${collectionSlug}`,
    null
  );

  React.useEffect(() => {
    const setUpPublicCollection = async () => {
      if (visitorValue) {
        const nameSatisfied =
          !publicCollection.fields_required.includes('name') ||
          visitorValue.name;
        const emailSatisfied =
          !publicCollection.fields_required.includes('email') ||
          visitorValue.email;
        const accessCodeSatisfied =
          !publicCollection.fields_required.includes('access_code') ||
          visitorValue.accessCode;

        if (!nameSatisfied || !emailSatisfied || !accessCodeSatisfied) {
          setLoading(false);

          return;
        }

        try {
          setLoading(true);

          const nextPublicCollection = await updatePublicCollection(
            {slug: collectionSlug},
            {
              name: visitorValue.name,
              email: visitorValue.email,
              access_code: visitorValue.accessCode,
            }
          );

          setPublicCollection(nextPublicCollection);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (publicCollection.fields_required) {
      setUpPublicCollection();
    }
  }, [
    collectionSlug,
    publicCollection.fields_required,
    visitorValue,
    updatePublicCollection,
  ]);

  const invalidatePublicCollection = useInvalidator(
    PublicCollectionResource.detailShape()
  );
  const logoutStatus = useSelector((state) => state.async.statuses[LOGOUT]);

  React.useEffect(() => {
    if (publicCollection.userManagesCollection && logoutStatus === 'success') {
      invalidatePublicCollection({slug: collectionSlug});
    }
  }, [logoutStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!loading && !publicCollection) {
      setPublicCollection(fetchedPublicCollection);
    }
  }, [fetchedPublicCollection]); // eslint-disable-line react-hooks/exhaustive-deps

  return {publicCollection, loading, setVisitorValue};
};

export default usePublicCollection;
