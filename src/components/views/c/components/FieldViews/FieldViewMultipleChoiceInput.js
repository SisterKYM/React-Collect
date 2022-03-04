import React from 'react';

import {InputErrorMessage, Select} from 'elements';

const FieldViewMultipleChoiceInput = ({
  name,
  errorMessage,
  values,
  value,
  onChangeValue,
}) => (
  <>
    <Select
      fontFamilySet
      name={name}
      className="ba br2"
      borderBrand={Boolean(errorMessage)}
      selectClassName="avenir-light"
      style={{fontSize: '1rem'}}
      options={[
        {
          children: 'Select one',
          value: '',
        },
        ...values.split('|||').map(value => ({
          value,
          children: value,
        })),
      ]}
      value={value}
      onChange={event => {
        onChangeValue(event.target.value);
      }}
    />
    {errorMessage && (
      <InputErrorMessage className="mt2">{errorMessage}</InputErrorMessage>
    )}
  </>
);

export default FieldViewMultipleChoiceInput;
