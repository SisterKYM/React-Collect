import React from 'react';

import config from 'config';
import {normalizeItems} from 'redux/modules/items/helpers';
import CollectionSettingsField from '../components/CollectionSettingsField';
import CollectionSettingsPaymentMethods from './PaymentMethods';
import CollectionSettingsFees from './Fees';
import CollectionSettingsReceipts from './Receipts';
import CollectionSettingsCollection from './Collection';
import CollectionSettingsTaxes from './Taxes';

const CollectionSettingsPayment = ({
  collection,
  items,
  collectionHasRecurringItems,
}) => {
  const normalItems = normalizeItems(
    items.filter(item => !item?.options?.recurring?.enabled)
  );

  return (
    <>
      <CollectionSettingsField
        title="PAYMENT METHODS"
        content={
          <CollectionSettingsPaymentMethods
            collection={collection}
            collectionHasRecurringItems={collectionHasRecurringItems}
          />
        }
      />
      <CollectionSettingsField
        title="FEES"
        content={<CollectionSettingsFees collection={collection} />}
      />
      <CollectionSettingsField
        title="RECEIPTS"
        content={<CollectionSettingsReceipts collection={collection} />}
      />
      {config.enabledFeatures.displayTotalCollected && (
        <CollectionSettingsField
          title="COLLECTION PAGE"
          content={<CollectionSettingsCollection collection={collection} />}
        />
      )}
      <CollectionSettingsField
        title="TAXES"
        content={
          <CollectionSettingsTaxes
            collection={collection}
            items={normalItems}
            collectionHasRecurringItems={collectionHasRecurringItems}
          />
        }
      />
    </>
  );
};

export default CollectionSettingsPayment;
