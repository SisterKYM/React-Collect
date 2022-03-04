import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import {cloneDeep, get, isEqual, isPlainObject} from 'lodash';
import {compose} from 'recompose';

import CollectionResource from 'resources/CollectionResource';
import {SEARCH_OPTIONS} from 'elements/SelectGrouped/SelectGroupedSearch';
import {SwitchExpandField} from '../../components';
import {AddTax, Tax} from './Tax';

const mapTaxFromValue = ({amount, apply, name}) => {
  const applyKeys = Object.keys(apply);
  const mapped = {
    applied_to: 'none',
    name,
    rate: Number(amount) / 100,
  };

  if (apply === SEARCH_OPTIONS.ALL) {
    mapped.applied_to = 'all';
  }
  if (isPlainObject(apply) && applyKeys.length !== 0) {
    mapped.applicable_items = applyKeys.map((ak) => Number(ak));
    mapped.applied_to = 'some';
  }

  return mapped;
};

const CollectionSettingsTaxes = ({
  collection,
  items,
  browser,
  collectionHasRecurringItems,
}) => {
  const updateCollection = useFetcher(CollectionResource.partialUpdateShape());

  const [state, setState] = useState({
    taxes_enabled: (collection.is_pro && collection.taxes_enabled) || false,
    taxes: Array.isArray(collection.taxes) ? collection.taxes : [],
  });
  const handleChange = (field) => (value) => {
    setState({
      ...state,
      [field]: value,
    });
  };
  const handleToggle = (event) => {
    updateCollection({id: collection.id}, event);
  };

  const itemsNoCategory = (items.itemsNoCategory || []).map((inc) => ({
    label: inc.name,
    value: inc.id,
  }));
  const itemsWithCategory = Object.values(
    (items.itemsWithCategory || []).reduce((acc, iwc) => {
      const categoryId = get(iwc, 'category.id');
      const newItem = {
        label: get(iwc, 'name'),
        value: get(iwc, 'id'),
      };

      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: {
            label: get(iwc, 'category.name'),
            value: categoryId,
          },
          options: [newItem],
        };
      } else {
        acc[categoryId].options.push(newItem);
      }

      return acc;
    }, {})
  );
  const taxes = state.taxes;

  const addTax = React.useCallback(
    (values) => {
      const newTax = mapTaxFromValue(values);
      const clonedTaxes = cloneDeep(taxes);

      clonedTaxes[taxes.length] = newTax;

      updateCollection({id: collection.id}, {taxes: clonedTaxes});

      if (JSON.stringify(state.taxes || {}) === '{}') {
        setState({
          ...state,
          taxes: [newTax],
        });
      } else {
        setState({
          ...state,
          taxes: [...state.taxes, newTax],
        });
      }
    },
    [taxes, collection, state, updateCollection]
  );

  const deleteTax = React.useCallback(
    (tax) => {
      const newTaxes = taxes.filter((tx) => !isEqual(tx, tax));

      updateCollection({id: collection.id}, {taxes: newTaxes});

      setState({
        ...state,
        taxes: newTaxes,
      });
    },
    [taxes, collection, state, updateCollection]
  );

  const editTax = React.useCallback(
    (position, values) => {
      const newTax = mapTaxFromValue(values);
      const clonedTaxes = cloneDeep(taxes);

      clonedTaxes[position] = newTax;

      updateCollection({id: collection.id}, {taxes: clonedTaxes});

      setState({
        ...state,
        taxes: clonedTaxes,
      });
    },
    [taxes, collection, state, updateCollection]
  );

  const TaxesForm = (
    <div className="tax-list-container mb2">
      {Array.isArray(taxes) && taxes.length !== 0 && (
        <ul>
          {taxes.map((tax, key) => (
            <Tax
              key={key}
              className={key ? 'mt3' : ''}
              browser={browser}
              clickDelete={deleteTax}
              editTax={editTax}
              optionsCategorized={itemsWithCategory}
              optionsNoCategorized={itemsNoCategory}
              position={key}
              tax={tax}
            />
          ))}
        </ul>
      )}
      <AddTax
        className={taxes.length !== 0 ? 'mt3' : ''}
        addTax={addTax}
        browser={browser}
        optionsCategorized={itemsWithCategory}
        optionsNoCategorized={itemsNoCategory}
      />
    </div>
  );

  return (
    <SwitchExpandField
      collection={collection}
      label="Include tax at checkout"
      id="collection-settings-tax"
      input={{
        name: 'taxes_enabled',
        value: state.taxes_enabled,
        onChange: handleChange('taxes_enabled'),
      }}
      body={TaxesForm}
      onToggle={handleToggle}
      authority="pro"
      warning={
        state.taxes_enabled && collectionHasRecurringItems
          ? `Please note: taxes won't be applied to recurring items`
          : ''
      }
    />
  );
};

const enhance = compose(
  connect((state) => ({
    browser: state.browser,
  }))
);

export default enhance(CollectionSettingsTaxes);
