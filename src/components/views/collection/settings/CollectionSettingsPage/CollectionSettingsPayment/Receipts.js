import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';

import CollectionResource from 'resources/CollectionResource';
import {RichTextMarkdown} from 'elements';
import {SwitchExpandField} from '../components';

const CollectionSettingsReceipts = ({collection}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    custom_receipt_enabled: collection.custom_receipt_enabled || false,
    custom_receipt_content: collection.custom_receipt_content || '',
  });
  const handleChange = field => value => {
    if (field === 'custom_receipt_content') {
      updateCollection({id: collection.id}, {[field]: value});
    }

    setState({
      ...state,
      [field]: value,
    });
  };
  const handleToggle = event => {
    if (event.custom_receipt_enabled !== undefined) {
      updateCollection({id: collection.id}, event);
    }
  };

  const RichTextBox = (
    <>
      <RichTextMarkdown
        italicDisabled
        className="rich-text-markdown-wrapper mb2"
        editorClassName="rich-text-markdown text-14"
        editorStyle={{fontSize: 14, lineHeight: '20px'}}
        name="message"
        placeholder="Enter message to appear at top of the receipt"
        input={{
          name: 'custom_receipt_content',
          value: state.custom_receipt_content,
          onChange: handleChange('custom_receipt_content'),
        }}
        meta={{error: {}}}
      />
      <style jsx>{`
        :global(.rich-text-markdown-wrapper) {
          max-width: 550px;
        }
        :global(.rich-text-markdown) {
          min-height: 120px;
        }
      `}</style>
    </>
  );

  return (
    <SwitchExpandField
      collection={collection}
      label="Customize payer receipt"
      id="collection-settings-receipt"
      input={{
        name: 'custom_receipt_enabled',
        value: state.custom_receipt_enabled,
        onChange: handleChange('custom_receipt_enabled'),
      }}
      body={RichTextBox}
      onToggle={handleToggle}
    />
  );
};

export default CollectionSettingsReceipts;
