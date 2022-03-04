import React from 'react';

import {TextInput} from 'elements';

const FieldViewTextInput = ({name, errorMessage, value, onChangeValue}) => (
  <TextInput
    name={name}
    errorMessage={errorMessage}
    value={value}
    onChange={event => {
      onChangeValue(event.target.value);
    }}
  />
);

export default FieldViewTextInput;
