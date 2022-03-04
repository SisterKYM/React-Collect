import React, {useCallback, useState} from 'react';

import {VerificationPrompt} from 'elements';
import CollectionResource from 'resources/CollectionResource';
import {useFetcher} from 'rest-hooks';

const CloseBulkCollectionModal = ({
  collectionIds,
  onDidCloseBulkCollections,
  onCancel,
}) => {
  const [waiting, setWaiting] = useState(false);
  const bulkCloseCollections = useFetcher(CollectionResource.bulkCloseShape());

  const handleCloseCollection = useCallback(async () => {
    try {
      setWaiting(true);
      await bulkCloseCollections({
        collection_ids: collectionIds,
      });

      setWaiting(false);

      onDidCloseBulkCollections();
    } catch (e) {
      // noop
    }
  }, [bulkCloseCollections, collectionIds, onDidCloseBulkCollections]);

  return (
    <VerificationPrompt
      flexibleHeight
      title="Are you sure?"
      description="Closing a collection makes it inactive, which means you can no longer receive payments on it. All reporting remains intact."
      okButtonLabel="Close"
      onOkButtonClick={handleCloseCollection}
      okButtonDisabled={waiting}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onCancel}
      cancelButtonDisabled={waiting}
      onDismiss={onCancel}
    />
  );
};

export default React.memo(CloseBulkCollectionModal);
