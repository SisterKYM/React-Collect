import React from 'react';

import DateInput from 'elements/DateInput';

import CollectionObjectFieldDateInputCustomInput from './CollectionObjectFieldDateInputCustomInput';

const CollectionObjectFieldDateInput = ({
  name,
  className,
  inputClassName,
  small,
  disabled,
  inactive,
  meta,
  input,
  value,
  onChange,
}) => {
  const selected = React.useMemo(() => {
    const realValue = input ? input.value : value;

    if (!realValue) {
      return undefined;
    }

    return typeof realValue === 'string' ? new Date(realValue) : realValue;
  }, [input, value]);

  return (
    <DateInput
      calendarIconHidden
      className={className}
      name={input ? String(input.name) : name}
      placeholderText="mm/dd/yy"
      meta={meta}
      customInput={
        <CollectionObjectFieldDateInputCustomInput
          className={inputClassName}
          disabled={disabled}
          small={small}
          inactive={inactive || (!input && !onChange)}
        />
      }
      disabled={disabled}
      selected={selected}
      onChange={input ? input.onChange : onChange}
    />
  );
};

const EnhancedCollectionObjectFieldDateInput = React.memo(
  CollectionObjectFieldDateInput
);

export default EnhancedCollectionObjectFieldDateInput;
