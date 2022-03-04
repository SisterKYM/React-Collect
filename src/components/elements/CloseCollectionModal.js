import React, {useCallback, useState} from 'react';
import config from 'config';
import {capitalize} from 'lodash';
import {useFetcher} from 'rest-hooks';

import {VerificationPrompt} from 'elements';
import CollectionResource from 'resources/CollectionResource';

const CloseCollectionModal = ({collection, onCancel, onDidCloseCollection}) => {
  const [handling, setHandling] = useState(false);
  const closeCollection = useFetcher(CollectionResource.closeShape());

  const handleCloseCollection = useCallback(async () => {
    try {
      setHandling(true);
      await closeCollection(
        {
          id: collection.id,
        },
        {
          closed_at: new Date(),
        }
      );

      setHandling(false);

      onDidCloseCollection();
    } catch (e) {
      // noop
    }
  }, [closeCollection, collection.id, onDidCloseCollection]);

  const closeMessage = config.isCheddarUp
    ? ' Please note, any scheduled recurring payments will continue.'
    : '';

  return (
    <VerificationPrompt
      flexibleHeight
      title={`Close ${capitalize(config.strings.collection)}?`}
      description={`Are you sure you'd like to close this ${config.strings.collection} and stop accepting payments?${closeMessage}`}
      okButtonLabel={`Close ${config.strings.collection}`}
      onOkButtonClick={handleCloseCollection}
      okButtonDisabled={handling}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={onCancel}
      cancelButtonDisabled={handling}
      onDismiss={onCancel}
    />
  );
};

const EnhancedCloseCollectionModal = React.memo(CloseCollectionModal);

export default EnhancedCloseCollectionModal;
