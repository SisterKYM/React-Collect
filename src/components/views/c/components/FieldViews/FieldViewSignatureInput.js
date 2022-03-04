import React from 'react';

import {CollectionObjectFieldSignatureInput, InputErrorMessage} from 'elements';

const FieldViewSignatureInput = ({
  name,
  errorMessage,
  value,
  onChangeValue,
}) => (
  <>
    <CollectionObjectFieldSignatureInput
      small
      name={name}
      inputClassName="br2"
      borderBrand={Boolean(errorMessage)}
      value={value}
      onChange={onChangeValue}
    />
    {errorMessage && (
      <InputErrorMessage className="mt2">{errorMessage}</InputErrorMessage>
    )}
  </>
);

export default FieldViewSignatureInput;
