import React, {useCallback, useState} from 'react';
import {useFetcher} from 'rest-hooks';

import {VerificationPrompt} from 'elements';
import FolderResource from 'resources/FolderResource';

const DeleteFolderModal = ({
  defaultFolderName,
  folder,
  onDismiss,
  onDidDeleteFolder,
}) => {
  const deleteFolder = useFetcher(FolderResource.deleteShape());

  const [pending, setPending] = useState(false);

  const closeModal = useCallback(
    (refetch) => {
      onDismiss(refetch);
    },
    [onDismiss]
  );

  const handleSubmit = useCallback(() => {
    setPending(true);

    deleteFolder({
      id: folder.id,
    })
      .then(() => {
        setPending(false);
        closeModal(true);
        onDidDeleteFolder();
      })
      .catch((e) => {
        // show error
        console.log(e);
      });
  }, [deleteFolder, folder, closeModal, onDidDeleteFolder]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={() => {
        closeModal(false);
      }}
      title="Delete Folder"
      description={`Your collections will not be deleted and will be added to your default folder: <span class="avenir-heavy">${defaultFolderName}</span>`}
      okButtonLabel={pending ? 'Deleting...' : 'Delete'}
      onOkButtonClick={handleSubmit}
      okButtonDisabled={pending}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={() => {
        closeModal();
      }}
      cancelButtonDisabled={pending}
    />
  );
};

export default React.memo(DeleteFolderModal);
