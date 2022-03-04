import {generatePath} from 'react-router-dom';
import {useInvalidator} from 'rest-hooks';
import moment from 'moment';
import React from 'react';

import PublicCollectionResource from 'resources/PublicCollectionResource';

import {CollectionTimingBarrier} from './components';
import {PayerPageBaseContainer} from '../containers';

const PrePayerTimingPage = ({match, history, publicCollection}) => {
  const collectionSlug = match.params.collection;

  const invalidatePublicCollectionDetail = useInvalidator(
    PublicCollectionResource.detailShape()
  );

  const handleTimingDidPass = React.useCallback(() => {
    invalidatePublicCollectionDetail({slug: collectionSlug});

    const path = generatePath('/c/:collection', {
      collection: collectionSlug,
    });

    history.push(path);
  }, [history, collectionSlug, invalidatePublicCollectionDetail]);

  return (
    <PayerPageBaseContainer
      prePayerPage
      collectionSlug={collectionSlug}
      publicCollection={publicCollection}
    >
      {moment().isAfter(publicCollection.timing.closes) ? (
        <div className="pv3 ph4 f3 tc white bg-tint">
          This collection has ended
        </div>
      ) : (
        <CollectionTimingBarrier
          className="w-80 w-100-ns mt3 center"
          publicCollection={publicCollection}
          onTimingDidPass={handleTimingDidPass}
        />
      )}
    </PayerPageBaseContainer>
  );
};

const EnhancedPrePayerTimingPage = React.memo(PrePayerTimingPage);

export default EnhancedPrePayerTimingPage;
