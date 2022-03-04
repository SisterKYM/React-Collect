import React from 'react';

import {Checkbox, InputErrorMessage} from 'elements';

const FieldViewCheckboxInput = ({
  name,
  errorMessage,
  values,
  value,
  onChangeValue,
}) => (
  <>
    <div name={name} className="flex mt2 flex-wrap">
      {values.split('|||').map((choice, idx) => {
        const values = value ? value.split('|||') : [];

        return (
          <Checkbox
            alignStart
            checkedOnValue
            key={idx}
            className="w-100 w-50-ns mv2-5"
            labelClassName="f5 avenir-light"
            label={choice}
            input={{value: values.includes(choice)}}
            onChange={({target: {value: checked}}) => {
              onChangeValue(
                checked === 'false'
                  ? `${value ? `${value}|||` : ''}${choice}`
                  : value
                      .split('|||')
                      .filter((value) => value !== choice)
                      .join('|||')
              );
            }}
          />
        );
      })}
    </div>
    {errorMessage && (
      <InputErrorMessage className="mt2">{errorMessage}</InputErrorMessage>
    )}
  </>
);

export default FieldViewCheckboxInput;
