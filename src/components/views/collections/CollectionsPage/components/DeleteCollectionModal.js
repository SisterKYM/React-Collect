import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import truncate from 'truncate';
import {useFetcher} from 'rest-hooks';

import {VerificationPrompt} from 'elements';
import CollectionResource from 'resources/CollectionResource';
import config from 'config';

const deleteUpdater = (deletedCollectionId, collectionIds) =>
  collectionIds.filter((collectionId) => collectionId !== deletedCollectionId);

const DeleteCollectionModal = ({
  collection,
  onDidDeleteCollection,
  onCancel,
  onDismiss,
}) => {
  const [deleting, setDeleting] = useState(false);
  const deleteCollection = useFetcher(CollectionResource.deleteShape());

  const handleDeleteCollection = useCallback(async () => {
    try {
      setDeleting(true);
      await deleteCollection({id: collection.id}, {}, [
        [CollectionResource.listShape(), {}, deleteUpdater],
      ]);

      setDeleting(false);

      onDidDeleteCollection();
    } catch (e) {
      // noop
    }
  }, [collection.id, deleteCollection, onDidDeleteCollection]);

  const deleteMessage = config.isCheddarUp
    ? ', and any scheduled recurring payments will be cancelled'
    : '';

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={onDismiss}
      title={`Delete ${_.capitalize(
        config.strings.collection
      )}. This cannot be undone.`}
      description={`You are going to delete <span class="avenir-heavy">${truncate(
        collection?.name,
        27
      )}</span>.<br />This cannot be undone${deleteMessage}. Are you sure?`}
      okButtonLabel={deleting ? 'Deleting...' : 'Delete'}
      onOkButtonClick={handleDeleteCollection}
      okButtonDisabled={deleting}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onCancel}
      cancelButtonDisabled={deleting}
    />
  );
};

const EnhancedDeleteCollectionModal = React.memo(DeleteCollectionModal);

export default EnhancedDeleteCollectionModal;
