import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';

import {Input} from 'elements';
import CollectionResource from 'resources/CollectionResource';
import {SwitchExpandField} from '../components';

const CollectionSettingsEntryCode = ({collection}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    access_code: collection.access_code || '',
    access_code_enabled: Boolean(collection.access_code) && collection.is_pro,
    validated: Boolean(collection.access_code),
    access_code_touched: false,
  });
  const handleBlur = () => {
    setState({
      ...state,
      access_code_touched: true,
    });
  };
  const handleChange = field => event => {
    if (field === 'access_code') {
      setState({
        ...state,
        validated: Boolean(event.target.value),
        [field]: event.target.value,
        access_code_touched: true,
      });
      if (event.target.value) {
        updateCollection(
          {id: collection.id},
          {
            id: collection.id,
            access_code: event.target.value,
          }
        ).catch(err => console.error('ERROR:', err));
      }
    } else if (field === 'access_code_enabled') {
      setState({
        ...state,
        [field]: event,
        access_code_touched: false,
        access_code: '',
      });
    } else {
      setState({
        ...state,
        [field]: event,
        access_code_touched: false,
      });
    }
  };

  const handleToggle = event => {
    if (!event.access_code_enabled) {
      updateCollection(
        {id: collection.id},
        {
          id: collection.id,
          access_code: '',
        }
      ).catch(err => console.error('ERROR:', err));
    }
  };

  const EntryCodeInput = (
    <div className="avenir-light dark-grey">
      <div className="pb2 text-14">
        Create a code that visitors must enter to access your collection page.
      </div>
      <div className="flex-l items-center mt2">
        <Input
          border
          className="w-third-l mr2-l mv2 text-14"
          readOnly={false}
          style={{height: 35, maxWidth: 242}}
          borderRadius
          placeholder="Entry Code"
          value={state.access_code}
          onChange={handleChange('access_code')}
          onBlur={handleBlur}
          meta={
            state.validated
              ? {}
              : {
                  warning: 'Required',
                  touched: state.access_code_touched,
                }
          }
        />
      </div>
    </div>
  );

  return (
    <SwitchExpandField
      collection={collection}
      label="Put my collection page behind an entry code"
      id="collection-settings-access-code"
      input={{
        name: 'access_code_enabled',
        value: state.access_code_enabled,
        onChange: handleChange('access_code_enabled'),
      }}
      body={EntryCodeInput}
      onToggle={handleToggle}
      authority="pro"
    />
  );
};

export default CollectionSettingsEntryCode;
