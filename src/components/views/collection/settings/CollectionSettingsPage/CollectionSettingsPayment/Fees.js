import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';

import CollectionResource from 'resources/CollectionResource';
import {SwitchExpandField} from '../components';

const CollectionSettingsFees = ({collection}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    processing_preference_enable:
      collection.processing_preference === 'user' || false,
    payerCanCoverFees: Boolean(collection?.options?.payerCanCoverFees),
  });
  const handleChange = (field) => (value) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const handleToggle = (event) => {
    const field = Object.keys(event)[0];
    if (field === 'processing_preference_enable') {
      updateCollection(
        {id: collection.id},
        {
          processing_preference:
            event.processing_preference_enable === true ? 'user' : 'member',
        }
      );
    } else if (field === 'payerCanCoverFees') {
      updateCollection(
        {id: collection.id},
        {
          options: {
            payerCanCoverFees: event.payerCanCoverFees === true,
          },
        }
      );
    }
  };

  return (
    <>
      <SwitchExpandField
        collection={collection}
        label="Cover fees for your payers"
        id="collection-settings-fee"
        input={{
          name: 'processing_preference_enable',
          value: state.processing_preference_enable,
          onChange: handleChange('processing_preference_enable'),
        }}
        onToggle={handleToggle}
      />
      {state.processing_preference_enable && (
        <SwitchExpandField
          collection={collection}
          label="Give payers the option to cover fees"
          id="payerCanCoverFees-enabled"
          input={{
            name: 'payerCanCoverFees',
            value: state.payerCanCoverFees,
            onChange: handleChange('payerCanCoverFees'),
          }}
          body={
            <div className="pb2 text-14 avenir-light dark-grey">
              Payers will see a checkbox during checkout to cover any associated
              fees
            </div>
          }
          onToggle={handleToggle}
        />
      )}
    </>
  );
};

export default CollectionSettingsFees;
