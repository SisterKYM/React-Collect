import React from 'react';

import {useSelector} from 'react-redux';
import {get} from 'lodash';
import CollectionSettingsField from '../components/CollectionSettingsField';
import CollectionSettingsEntryCode from './EntryCode';
import CollectionSettingsSearch from './Search';
import CollectionSettingsTiming from './Timing';
import CollectionSettingsReport from './Report';
import CollectionSettingsInternalMarketPlace from './InternalMarketPlace';

const CollectionSettingsAccessTiming = ({
  collection,
  collectionHasRecurringItems,
}) => {
  const isInternalMarketplaceEnabled = useSelector((state) =>
    get(state.session, 'organization_data.internalMarketplace.enabled')
  );
  const marketplaceName = useSelector((state) =>
    get(
      state.session,
      'organization_data.internalMarketplace.organizerNickname'
    )
  );
  return (
    <>
      <CollectionSettingsField
        title="TIMING"
        content={
          <CollectionSettingsTiming
            collection={collection}
            collectionHasRecurringItems={collectionHasRecurringItems}
          />
        }
      />
      <CollectionSettingsField
        title="SEARCH"
        content={<CollectionSettingsSearch collection={collection} />}
      />
      {isInternalMarketplaceEnabled && (
        <CollectionSettingsField
          title={`${marketplaceName.toUpperCase()} MARKETPLACE`}
          content={
            <CollectionSettingsInternalMarketPlace
              collection={collection}
              marketplaceName={marketplaceName}
            />
          }
          beta
        />
      )}
      <CollectionSettingsField
        title="ENTRY CODE"
        content={<CollectionSettingsEntryCode collection={collection} />}
      />
      <CollectionSettingsField
        title="VISITOR REPORT"
        content={<CollectionSettingsReport collection={collection} />}
      />
    </>
  );
};

export default CollectionSettingsAccessTiming;
