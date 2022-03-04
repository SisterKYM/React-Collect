import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';

import CollectionResource from 'resources/CollectionResource';
import {SwitchExpandField} from '../components';

const CollectionSettingsSearch = ({collection}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    doNotIndex: Boolean(collection.options.doNotIndex),
  });
  const handleChange = field => value => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const handleToggle = event => {
    updateCollection(
      {id: collection.id},
      {
        options: {
          doNotIndex: event.doNotIndex,
        },
      }
    ).catch(err => console.error('ERROR:', err));
  };

  return (
    <SwitchExpandField
      collection={collection}
      label="Hide your collection page from search engines"
      id="collection-settings-search"
      input={{
        name: 'doNotIndex',
        value: state.doNotIndex,
        onChange: handleChange('doNotIndex'),
      }}
      onToggle={handleToggle}
    />
  );
};

export default CollectionSettingsSearch;
