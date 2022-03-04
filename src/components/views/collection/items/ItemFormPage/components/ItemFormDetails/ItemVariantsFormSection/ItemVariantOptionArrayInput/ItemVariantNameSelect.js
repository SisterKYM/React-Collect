import React from 'react';

import {CreatableSelect} from 'elements';
import useToggle from 'hooks/useToggle';

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
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: base => ({
    ...base,
    fontSize: '1.5rem',
  }),
  clearIndicator: base => ({
    ...base,
    padding: 4,
  }),
  valueContainer: base => ({
    ...base,
    padding: '0px 6px',
  }),
  input: base => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  option: provided => ({
    ...provided,
    backgroundColor: 'rgb(215, 238, 241)',
  }),
};

const ItemVariantNameSelect = ({
  className,
  clearable,
  disabled,
  variantOptionKeys,
  input,
  onDelete,
}) => {
  const [deletePopUpVisible, deletePopUpVisibleToggle] = useToggle();

  return (
    <div className="relative">
      <CreatableSelect
        className={className}
        styles={selectStyles}
        isClearable={clearable}
        isDisabled={disabled}
        placeholder="E.g. Size"
        values={variantOptionKeys}
        value={input.value}
        onChange={input.onChange}
        onDelete={deletePopUpVisibleToggle.on}
        onCreateOption={input.onChange}
      />
      {deletePopUpVisible && (
        <DeleteItemOptionPopUp
          className="absolute top-1 left-1 z-999"
          title="Delete option"
          description="You cannot recover deleted options, do you wish to continue?"
          onDelete={onDelete}
          onCancel={deletePopUpVisibleToggle.off}
        />
      )}
    </div>
  );
};

const EnhancedItemVariantNameSelect = React.memo(ItemVariantNameSelect);

export default EnhancedItemVariantNameSelect;
