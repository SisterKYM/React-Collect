import React from 'react';

import CollectionObjectFieldSignatureInput from 'elements/CollectionObjectFieldSignatureInput';

import CollectionObjectFieldValueHeading from './CollectionObjectFieldValueHeading';
import CollectionObjectFieldValueWrapper from './CollectionObjectFieldValueWrapper';

const CollectionObjectFieldSignature = ({
  className,
  headingClassName,
  sortClassName,
  inputClassName,
  noHorizontalMargin,
  preview,
  small,
  editable,
  field,
  input,
  value,
  onClick,
  onClickInput,
  onChange,
}) => (
  <CollectionObjectFieldValueWrapper
    sortClassName={sortClassName}
    noHorizontalMargin={noHorizontalMargin}
    backgroundTransparent={editable}
    onClick={onClick}
  >
    <CollectionObjectFieldValueHeading
      className={headingClassName}
      small={small}
      field={field}
    />
    <div className={className} onClick={onClickInput}>
      {preview ? (
        <img className="mt2" alt="Signature" src={input.value} />
      ) : (
        <CollectionObjectFieldSignatureInput
          className="mt2"
          inputClassName={inputClassName}
          small={small}
          disabled={!input && !onChange}
          input={input}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  </CollectionObjectFieldValueWrapper>
);

const EnhancedCollectionObjectFieldSignature = React.memo(
  CollectionObjectFieldSignature
);

export default EnhancedCollectionObjectFieldSignature;
