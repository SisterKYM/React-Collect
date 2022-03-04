import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';

import CollectionResource from 'resources/CollectionResource';
import {SwitchExpandField} from '../components';

const CollectionSettingsReport = ({collection}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    payer_identify: Boolean(collection.payer_identify) && collection.is_pro,
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
        id: collection.id,
        payer_identify: event.payer_identify,
      }
    ).catch(err => console.error('ERROR:', err));
  };
  const VisitorReportContent = (
    <div className="avenir-light dark-grey w-80">
      <div className="pb2 text-14">
        Gather the names and emails of everyone who views your page, both payers
        and visitors. Access and export your visitor report directly from your
        manage view.
      </div>
    </div>
  );

  return (
    <SwitchExpandField
      collection={collection}
      label="See who visited your collection page"
      id="collection-settings-report"
      input={{
        name: 'payer_identify',
        value: state.payer_identify,
        onChange: handleChange('payer_identify'),
      }}
      body={VisitorReportContent}
      onToggle={handleToggle}
      authority="pro"
    />
  );
};

export default CollectionSettingsReport;
