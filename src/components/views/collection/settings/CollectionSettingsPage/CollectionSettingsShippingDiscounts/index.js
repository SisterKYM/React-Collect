import React from 'react';

import CollectionSettingsField from '../components/CollectionSettingsField';
import CollectionSettingsShipping from './Shipping';
import CollectionSettingsDiscounts from './Discounts';

const CollectionSettingsShippingDiscounts = ({
  collection,
  collectionHasRecurringItems,
}) => (
  <>
    <CollectionSettingsField
      title="SHIPPING"
      content={
        <CollectionSettingsShipping
          collection={collection}
          collectionHasRecurringItems={collectionHasRecurringItems}
        />
      }
    />
    <CollectionSettingsField
      title="DISCOUNTS"
      content={
        <CollectionSettingsDiscounts
          collection={collection}
          collectionHasRecurringItems={collectionHasRecurringItems}
        />
      }
    />
  </>
);

export default CollectionSettingsShippingDiscounts;
