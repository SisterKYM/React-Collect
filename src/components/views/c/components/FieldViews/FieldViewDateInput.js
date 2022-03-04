import React from 'react';

import {DateInput, InputErrorMessage, TextInput} from 'elements';
import DateIcon from 'theme/images/Date.svg';

const CustomInput = React.forwardRef((props, ref) => (
  <TextInput ref={ref} {...props}>
    <span className="absolute top-0 bottom-0 right-0 flex ph2 items-center">
      <img className="w1 h1" alt="Date" src={DateIcon} />
    </span>
  </TextInput>
));

const FieldViewDateInput = ({
  name,
  disabled,
  errorMessage,
  value,
  onChangeValue,
}) => (
  <>
    <DateInput
      border
      calendarIconHidden
      name={name}
      className="br2"
      disabled={disabled}
      borderBrand={Boolean(errorMessage)}
      placeholderText="mm/dd/yy"
      selected={(value && new Date(value)) || undefined}
      onChange={onChangeValue}
      customInput={<CustomInput type="date" />}
    />
    {errorMessage && (
      <InputErrorMessage className="mt2">{errorMessage}</InputErrorMessage>
    )}
  </>
);

export default FieldViewDateInput;
