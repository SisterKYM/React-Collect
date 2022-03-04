import React from 'react';
import _ from 'lodash';

import {CreatableSelect} from 'elements';
import config from 'config';

import DeleteItemOptionPopUp from './DeleteItemOptionPopUp';

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    margin: '4px 0',
    minHeight: '2.25rem',
    borderRadius: '0.25rem',
    borderColor:
      state.menuIsOpen || state.isFocused ? '#257a91' : provided.borderColor,
    boxShadow:
      state.menuIsOpen || state.isFocused
        ? '0 0 0 1px #257a91'
        : provided.boxShadow,
    '&:hover': {
      borderColor:
        state.menuIsOpen || state.isFocused ? '#257a91' : provided.borderColor,
    },
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    fontSize: '1.5rem',
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 4,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0px 6px',
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(215, 238, 241)',
  }),
  multiValue: (base) => ({
    ...base,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: config.colors.lightTint,
    color: config.colors.gray700,
  }),
  multiValueRemove: (base) => ({
    ...base,
    '&:hover': {
      backgroundColor: 'unset',
    },
  }),
};

const ItemVariantValuesSelect = ({
  className,
  variantOptionValues,
  optionName,
  input,
}) => {
  const [valueToDelete, setValueToDelete] = React.useState(null);

  const handleChange = React.useCallback(
    (nextValue) => {
      input.onChange(nextValue);
    },
    [input]
  );

  const handleDelete = React.useCallback(() => {
    input.onChange(_.without(input.value, valueToDelete));
    setValueToDelete(null);
  }, [input, valueToDelete]);

  const handleCancelDeletePopUp = React.useCallback(() => {
    setValueToDelete(null);
  }, []);

  return (
    <div className="relative">
      <CreatableSelect
        isMulti
        className={className}
        styles={selectStyles}
        isClearable={false}
        placeholder="E.g. Small"
        values={variantOptionValues}
        value={input.value}
        onDelete={setValueToDelete}
        onChange={handleChange}
      />
      {valueToDelete && (
        <DeleteItemOptionPopUp
          className="absolute top-1 left-1 z-999"
          title="Delete option value"
          description={
            <>
              You&apos;re about to delete 1 variant with a{' '}
              <span className="avenir-heavy">{optionName.toLowerCase()}</span>{' '}
              of <span className="avenir-heavy">{valueToDelete}</span>. This
              action can&apos;t be undone.
            </>
          }
          onDelete={handleDelete}
          onCancel={handleCancelDeletePopUp}
        />
      )}
    </div>
  );
};

const EnhancedItemVariantValuesSelect = React.memo(ItemVariantValuesSelect);

export default EnhancedItemVariantValuesSelect;
