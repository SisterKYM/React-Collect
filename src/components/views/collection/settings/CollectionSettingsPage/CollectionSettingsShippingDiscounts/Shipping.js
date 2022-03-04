import React, {useState} from 'react';
import {useFetcher} from 'rest-hooks';

import CollectionResource from 'resources/CollectionResource';
import {RichTextMarkdown, Input} from 'elements';
import {SwitchExpandField} from '../components';

const CollectionSettingsShipping = ({
  collection,
  collectionHasRecurringItems,
}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    shipToEnabled:
      collection.shipping_options.shipToEnabled && collection.is_pro,
    freeOverEnabled: collection.shipping_options.freeOverEnabled,
    localPickupEnabled: collection.shipping_options.localPickupEnabled,
    freeOver:
      (collection.shipping_options.freeOverEnabled &&
        collection.shipping_options.freeOver) ||
      '',
    cost:
      (collection.shipping_options.shipToEnabled &&
        collection.shipping_options.cost) ||
      '',
    costTouched: false,
    freeOverTouched: false,
    localPickupInstructions:
      collection.shipping_options.localPickupInstructions || '',
  });

  const handleBlur = (field) => () => {
    setState({
      ...state,
      [`${field}Touched`]: true,
    });
  };

  const handleChange = (field) => (event) => {
    let options = {...state};
    switch (field) {
      case 'cost':
      case 'freeOver':
        options = {
          ...options,
          [field]: event.target.value,
          [`${field}Touched`]: true,
        };
        break;
      case 'localPickupInstructions':
        options = {
          ...options,
          [field]: event,
          // [`${field}Touched`]: true,
        };
        break;
      case 'shipToEnabled':
        options = {
          ...options,
          [field]: event,
          cost: '',
          freeOver: '',
          localPickupInstructions: '',
          costTouched: false,
          freeOverTouched: false,
          freeOverEnabled: false,
          localPickupEnabled: false,
        };
        break;
      default:
        options = {
          ...options,
          [field]: event,
        };
    }

    if (
      !options.shipToEnabled ||
      (options.cost && (!options.freeOverEnabled || options.freeOver))
    ) {
      updateCollection(
        {id: collection.id},
        {
          shipping_options: {
            ...options,
            cost: options.cost || 0,
            freeOver: options.freeOver || 0,
          },
        }
      );
    }

    setState(options);
  };

  const handleToggle = (event) => {
    const field = Object.keys(event)[0];
    if (event[field]) {
      return;
    }
    if (field === 'shipToEnabled') {
      updateCollection(
        {id: collection.id},
        {
          shipping_options: {
            ...state,
            [field]: event[field],
            cost: state.cost || 0,
            freeOver: state.freeOver || 0,
          },
        }
      );
    } else {
      updateCollection(
        {id: collection.id},
        {
          shipping_options: {
            ...state,
            [field]: event[field],
            cost: state.cost || 0,
            freeOver: state.freeOver || 0,
          },
        }
      );
    }
  };

  const ShippingFeeInput = (
    <div className="avenir-light dark-grey">
      <div className="pb2 text-14">
        Track shipping, purchase postage and print pre-filled labels directly
        from your manage view.
      </div>
      {collectionHasRecurringItems && (
        <div className="text-14 flamingo">
          Please note: the shipping fee for recurring payment items will only
          apply to first checkout
        </div>
      )}
      <div className="shipping-fee-input w-third-l flex-l flex-column mt3">
        <div className="avenir-roman text-12 dark-grey">Shipping fee</div>
        <Input
          border
          className="mr2-l mv2 text-14 number-dollar-currency"
          readOnly={false}
          style={{height: 36}}
          borderRadius
          placeholder="0"
          type="number"
          value={state.cost}
          onBlur={handleBlur('cost')}
          onChange={handleChange('cost')}
          meta={
            state.cost ? {} : {warning: 'Required', touched: state.costTouched}
          }
        />
      </div>
      <style jsx>{`
        .shipping-fee-input {
          max-width: 200px;
        }
      `}</style>
    </div>
  );

  const FreeOverInput = (
    <div className="avenir-light dark-grey">
      <div className="pb2 text-14">
        Your customers will see “free shipping” if order is over a specified
        amount.
      </div>
      <div className="free-over-input w-third-l flex-l flex-column mt3">
        <div className="avenir-roman text-12 dark-grey">Minimum Amount</div>
        <Input
          border
          className="mr2-l mv2 text-14 number-dollar-currency"
          readOnly={false}
          style={{height: 36}}
          borderRadius
          placeholder="0"
          type="number"
          value={state.freeOver}
          onChange={handleChange('freeOver')}
          onBlur={handleBlur('freeOver')}
          meta={
            state.freeOver
              ? {}
              : {warning: 'Required', touched: state.freeOverTouched}
          }
        />
      </div>
      <style jsx>{`
        .free-over-input {
          max-width: 200px;
        }
      `}</style>
    </div>
  );

  const RichTextBox = (
    <>
      <div className="pb2 text-14 gray-600">
        Allow customer to opt out of shipping fee.
      </div>
      <RichTextMarkdown
        border
        boxShadow={false}
        showToolbar={false}
        className="rich-text-markdown-wrapper mb2"
        editorClassName="rich-text-markdown text-14"
        editorStyle={{fontSize: 14, lineHeight: '20px'}}
        name="localPickupInstructions"
        placeholder="Optional: Provide pickup instructions"
        input={{
          name: 'localPickupInstructions',
          value: state.localPickupInstructions || '',
          onChange: handleChange('localPickupInstructions'),
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

  return (
    <>
      <SwitchExpandField
        collection={collection}
        label="Add flat shipping fee at checkout"
        id="add-flat-shipping-fee"
        input={{
          name: 'shipToEnabled',
          value: state.shipToEnabled,
          onChange: handleChange('shipToEnabled'),
        }}
        body={ShippingFeeInput}
        onToggle={handleToggle}
        authority="pro"
      />
      {state.shipToEnabled && (
        <>
          <SwitchExpandField
            collection={collection}
            label={`Offer "free shipping" with minimum order:`}
            id="free-over-enabled"
            input={{
              name: 'freeOverEnabled',
              value: state.freeOverEnabled,
              onChange: handleChange('freeOverEnabled'),
            }}
            body={FreeOverInput}
            onToggle={handleToggle}
          />
          <SwitchExpandField
            collection={collection}
            label="Enable free local pickup"
            id="local-pickup-enabled"
            input={{
              name: 'localPickupEnabled',
              value: state.localPickupEnabled,
              onChange: handleChange('localPickupEnabled'),
            }}
            body={RichTextBox}
            onToggle={handleToggle}
          />
        </>
      )}
    </>
  );
};

export default CollectionSettingsShipping;
