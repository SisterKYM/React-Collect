import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';
import {get} from 'lodash';

import CollectionResource from 'resources/CollectionResource';
import {SwitchExpandField} from '../components';

const CollectionSettingsInternalMarketPlace = ({
  collection,
  marketplaceName,
}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    show_internal_marketplace: get(
      collection,
      'options.internalMarketplace.enabled',
      false
    ),
  });
  const handleChange = (field) => (value) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const handleToggle = (event) => {
    updateCollection(
      {id: collection.id},
      {
        id: collection.id,
        options: {
          internalMarketplace: {
            enabled: event.show_internal_marketplace,
          },
        },
      }
    ).catch((err) => console.error('ERROR:', err));
  };

  return (
    <SwitchExpandField
      collection={collection}
      label={`List your sale page in the ${marketplaceName} Marketplace`}
      id="collection-settings-InternalMarketPlace"
      input={{
        name: 'show_internal_marketplace',
        value: state.show_internal_marketplace,
        onChange: handleChange('show_internal_marketplace'),
      }}
      onToggle={handleToggle}
    />
  );
};

export default CollectionSettingsInternalMarketPlace;
