import _ from 'lodash';
import {components} from 'react-select';
import {IoMdArrowDropdown, IoMdClose} from 'react-icons/io';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import CreatableReactSelect from 'react-select/creatable';
import React from 'react';

const createOption = (label) => ({
  label,
  value: label,
});

const createArrayOption = (arrayLabel) =>
  arrayLabel.map((arrayLabelLabel) => createOption(arrayLabelLabel));

const arrayMove = (array, from, to) => {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);

  return array;
};

const SortableMultiValue = SortableElement((props) => {
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <components.MultiValue
      {...props}
      className="z-999"
      innerProps={{onMouseDown, ...props.innerProps}}
    />
  );
});

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <IoMdArrowDropdown />
  </components.DropdownIndicator>
);

const MultiValueRemove = (props) => (
  <components.MultiValueRemove {...props}>
    <IoMdClose />
  </components.MultiValueRemove>
);

const SortableSelect = SortableContainer(CreatableReactSelect);

const CreatableSelect = ({
  isMulti,
  values,
  value,
  onChange,
  onDelete,
  ...props
}) => {
  const options = React.useMemo(
    () =>
      values
        .filter((valuesValue) => !value.includes(valuesValue))
        .map((valuesValue) => ({
          label: valuesValue,
          value: valuesValue,
        })),
    [value, values]
  );
  const selectedOption = React.useMemo(() => {
    if (Array.isArray(value)) {
      return createArrayOption(value);
    }

    return value ? createOption(value) : undefined;
  }, [value]);

  const handleChange = React.useCallback(
    (nextValue) => {
      if (!nextValue && !Array.isArray(value)) {
        onDelete(null, nextValue);
      } else if ((nextValue || []).length < value.length) {
        const nextValueValues = (nextValue || []).map(({value}) => value);

        onDelete(_.difference(value, nextValueValues)[0], nextValueValues);
      } else if (Array.isArray(value)) {
        onChange(nextValue ? nextValue.map(({value}) => value) : []);
      } else {
        onChange(nextValue ? nextValue.value : '');
      }
    },
    [onChange, onDelete, value]
  );

  const handleSortEnd = React.useCallback(
    ({oldIndex, newIndex}) => {
      const newValue = arrayMove(value, oldIndex, newIndex);

      onChange(newValue);
    },
    [value, onChange]
  );

  return isMulti ? (
    <SortableSelect
      {...props}
      isMulti
      closeMenuOnSelect={false}
      axis="xy"
      distance={4}
      getHelperDimensions={({node}) => node.getBoundingClientRect()}
      options={options}
      value={selectedOption}
      styles={props.styles}
      components={{
        DropdownIndicator,
        MultiValueRemove,
        MultiValue: SortableMultiValue,
      }}
      onChange={handleChange}
      onSortEnd={handleSortEnd}
    />
  ) : (
    <CreatableReactSelect
      {...props}
      isMulti={false}
      options={options}
      value={selectedOption}
      styles={props.styles}
      components={{DropdownIndicator, MultiValueRemove}}
      onChange={handleChange}
    />
  );
};

const EnhancedCreatableSelect = React.memo(CreatableSelect);

export default EnhancedCreatableSelect;
