import {generatePath} from 'react-router-dom';
import React from 'react';

import {ImageUploadModal, Modal, ModalCloseButton} from 'elements';

const CollectionLogoUploadPage = ({location, history, match}) => {
  const dismissPath = generatePath('/collection/:owner/:collection?/details', {
    owner: match.params.owner,
    collection: match.params.collection,
  });

  const handleDismiss = React.useCallback(() => {
    history.push(dismissPath, location.state);
  }, [history, location.state, dismissPath]);

  const handleSubmit = React.useCallback(
    logo => {
      history.push(dismissPath, {...location.state, logo});
    },
    [history, location.state, dismissPath]
  );

  return (
    <Modal flexibleHeight size="SMALL" onDismiss={handleDismiss}>
      <ModalCloseButton onClick={handleDismiss} />
      <ImageUploadModal
        className="pa3"
        heading="Add Logo Image"
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};

const EnhancedCollectionLogoUploadPage = React.memo(CollectionLogoUploadPage);

export default EnhancedCollectionLogoUploadPage;
