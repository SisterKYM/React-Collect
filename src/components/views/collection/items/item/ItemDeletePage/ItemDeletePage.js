import {useCache, useFetcher} from 'rest-hooks';
import React from 'react';
import _ from 'lodash';

import {VerificationPrompt} from 'elements';
import ItemResource from 'resources/ItemResource';

const ItemDeletePage = ({history, match}) => {
  const item = useCache(ItemResource.detailShape(), {
    collectionId: match.params.collection,
    id: match.params.item,
  });
  const deleteItem = useFetcher(ItemResource.deleteShape(), true);

  const [loading, setLoading] = React.useState(false);

  const isItemRecurring = Boolean(
    _.get(item, 'options.recurring.enabled', false)
  );

  const itemsPath = `/collection/${match.params.owner}/${match.params.collection}/items`;

  React.useEffect(() => {
    const totalBuyers = _.get(item, 'total_buyers', 0);

    if (!totalBuyers && !isItemRecurring) {
      history.push(itemsPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, isItemRecurring]);

  const handleConfirm = React.useCallback(async () => {
    setLoading(true);

    await deleteItem({
      collectionId: match.params.collection,
      id: match.params.item,
    });

    history.push(itemsPath);
  }, [match.params, history, itemsPath, deleteItem]);

  const handleDismiss = React.useCallback(() => {
    history.push(itemsPath);
  }, [history, itemsPath]);

  return (
    <VerificationPrompt
      flexibleHeight
      onDismiss={handleDismiss}
      title="Are you sure?"
      description={
        isItemRecurring
          ? `Deleting this item will stop all future scheduled recurring payments on this item.`
          : 'You will no longer have access to payment records for this item.'
      }
      okButtonLabel="Delete Item"
      onOkButtonClick={handleConfirm}
      okButtonDisabled={loading}
      cancelButtonLabel="Cancel"
      onCancelButtonClick={handleDismiss}
      cancelButtonDisabled={loading}
    />
  );
};

const EnhancedItemDeletePage = React.memo(ItemDeletePage);

export default EnhancedItemDeletePage;
