import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';
import {useSelector} from 'react-redux';

import config from 'config';
import {RichTextMarkdown, Input} from 'elements';
import CartHelpers from 'helpers/CartHelpers';
import CollectionResource from 'resources/CollectionResource';
import {SwitchExpandField} from '../components';

const CollectionSettingsPaymentMethods = ({
  collection,
  collectionHasRecurringItems,
}) => {
  const userCurrency = useSelector((state) => state.session.user.currency);
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    allow_echeck_payments: collection.allow_echeck_payments || false,
    allow_offline_payments: collection.allow_offline_payments || false,
    offline_payment_instructions: collection.offline_payment_instructions || '',
    statement_descriptor_enable:
      collection.options &&
      collection.options.customCardDescriptor &&
      collection.options.customCardDescriptor.enabled,
    statement_descriptor: collection.statement_descriptor || '',
  });
  const offlineInstructionsWarning = () => {
    if (CartHelpers.instructionsInvalid(state.offline_payment_instructions)) {
      return CartHelpers.censorInstructions(
        state.offline_payment_instructions,
        true
      );
    }
    if (collectionHasRecurringItems) {
      return `Please note: this setting not available on ${config.strings.collection}s with recurring payment items`;
    }
    return '';
  };
  const handleChange = (field) => (event) => {
    if (field === 'statement_descriptor') {
      updateCollection(
        {id: collection.id},
        {
          options: {
            customCardDescriptor: {enabled: true, value: event.target.value},
          },
        }
      );
    }

    if (field === 'offline_payment_instructions') {
      updateCollection({id: collection.id}, {[field]: event});
    }

    switch (field) {
      case 'statement_descriptor':
        return setState({
          ...state,
          [field]: event.target.value,
        });
      default:
        return setState({
          ...state,
          [field]: event,
        });
    }
  };

  const handleToggle = (event) => {
    if (
      event.allow_echeck_payments !== undefined ||
      event.allow_offline_payments !== undefined
    ) {
      updateCollection({id: collection.id}, event);
    }

    if (event.statement_descriptor_enable !== undefined) {
      updateCollection(
        {id: collection.id},
        {
          options: {
            customCardDescriptor: {
              enabled: event.statement_descriptor_enable,
              value: state.statement_descriptor,
            },
          },
        }
      );
    }
  };

  const cardLabel = (
    <div>
      Customize what payers see on their credit card statement:{' '}
      <span className="brand pointer">{collection.statement_descriptor}</span>
    </div>
  );

  const RichTextBox = (
    <>
      <RichTextMarkdown
        border
        boxShadow={false}
        showToolbar={false}
        className="rich-text-markdown-wrapper mb2"
        editorClassName="rich-text-markdown text-14"
        editorStyle={{fontSize: 14, lineHeight: '20px'}}
        name="offline_payment_instructions"
        placeholder="Optional: Provide mailing or delivery details for those who choose to pay by cash or check"
        input={{
          name: 'offline_payment_instructions',
          value: state.offline_payment_instructions,
          onChange: handleChange('offline_payment_instructions'),
        }}
        meta={{error: {}}}
      />
      <style jsx>{`
        :global(.rich-text-markdown-wrapper) {
          max-width: 550px;
        }
        :global(.rich-text-markdown) {
          min-height: 113px;
        }
      `}</style>
    </>
  );

  const MAX_VALUE_CHAR_NUM = 17;
  const DescriptorInput = (
    <div className="avenir-light dark-grey">
      <div className="pb2 text-14">
        Choose something that your payers will recognize to avoid disputes
        (numbers and special characters not allowed).
      </div>
      <div className="flex-l items-center mt2">
        <Input
          border
          className="w-third-l mr2-l mv2 text-14"
          readOnly={false}
          style={{height: 35, maxWidth: 242}}
          borderRadius
          maxLength={MAX_VALUE_CHAR_NUM}
          placeholder="Credit card descriptor"
          value={state.statement_descriptor}
          onChange={handleChange('statement_descriptor')}
        />
        <div className="ml3-l text-14 gray-400">
          You are limited to {MAX_VALUE_CHAR_NUM} characters.
        </div>
      </div>
    </div>
  );

  return (
    <>
      {userCurrency !== 'cad' ? (
        <SwitchExpandField
          collection={collection}
          label="Allow payments by echeck"
          id="collection-settings-payment-methods-echeck"
          input={{
            name: 'allow_echeck_payments',
            value: state.allow_echeck_payments,
            onChange: handleChange('allow_echeck_payments'),
          }}
          onToggle={handleToggle}
        />
      ) : null}
      <SwitchExpandField
        collection={collection}
        label="Allow payments by cash or check"
        id="collection-settings-payment-methods-cache"
        input={{
          name: 'allow_offline_payments',
          value: state.allow_offline_payments && !collectionHasRecurringItems,
          onChange: handleChange('allow_offline_payments'),
        }}
        body={RichTextBox}
        onToggle={handleToggle}
        warning={offlineInstructionsWarning()}
        disableToggle={collectionHasRecurringItems}
      />
      <SwitchExpandField
        collection={collection}
        label={cardLabel}
        id="collection-settings-payment-methods-card"
        input={{
          name: 'statement_descriptor_enable',
          value: state.statement_descriptor_enable,
          onChange: handleChange('statement_descriptor_enable'),
        }}
        body={DescriptorInput}
        onToggle={handleToggle}
      />
    </>
  );
};

export default CollectionSettingsPaymentMethods;
