import React, {useState, useCallback} from 'react';
import {useFetcher} from 'rest-hooks';

import {VerificationPrompt} from 'elements';
import CollectionResource from 'resources/CollectionResource';

const DeleteBulkCollectionModal = ({
  collectionIds,
  onDidDeleteBulkCollections,
  onCancel,
  onDismiss,
}) => {
  const deleteBulkCollections = useFetcher(
    CollectionResource.bulkDeleteShape()
  );
  const [deleting, setDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setDeleting(true);
      await deleteBulkCollections({
        collection_ids: collectionIds,
      });
      setDeleting(false);

      onDidDeleteBulkCollections();
    } catch (e) {
      // noop
    }
  }, [collectionIds, deleteBulkCollections, onDidDeleteBulkCollections]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={onDismiss}
      title="Are you sure?"
      description="This deletes the collection page itself as well as all payer data and information and cannot be undone."
      okButtonLabel={deleting ? 'Deleting...' : 'Delete'}
      onOkButtonClick={handleDelete}
      okButtonDisabled={deleting}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onCancel}
      cancelButtonDisabled={deleting}
    />
  );
};

const EnhancedDeleteBulkCollectionModal = React.memo(DeleteBulkCollectionModal);

export default EnhancedDeleteBulkCollectionModal;
