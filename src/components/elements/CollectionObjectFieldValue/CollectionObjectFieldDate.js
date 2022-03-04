import React from 'react';
import cx from 'classnames';

import CollectionObjectFieldDateInput from '../CollectionObjectFieldDateInput';
import CollectionObjectFieldValueHeading from './CollectionObjectFieldValueHeading';
import CollectionObjectFieldValueWrapper from './CollectionObjectFieldValueWrapper';

const CollectionObjectFieldDate = ({
  className,
  headingClassName,
  inputClassName,
  small,
  sortClassName,
  editable,
  inactive,
  inputDisplayBlock,
  noHorizontalMargin,
  field,
  meta,
  input,
  value,
  onChange,
  onClick,
  onClickInput,
}) => (
  <CollectionObjectFieldValueWrapper
    inactive={inactive}
    sortClassName={sortClassName}
    backgroundTransparent={editable}
    noHorizontalMargin={noHorizontalMargin}
    onClick={onClick}
  >
    <CollectionObjectFieldValueHeading
      className={headingClassName}
      small={small}
      field={field}
      noTitle={inactive}
    />
    <div
      className={cx(inputDisplayBlock ? 'db' : 'dib', className)}
      onClick={onClickInput}
    >
      <CollectionObjectFieldDateInput
        className="mt2"
        inputClassName={inputClassName}
        small={small}
        inactive={inactive}
        meta={meta}
        input={input}
        value={value}
        onChange={onChange}
      />
    </div>
  </CollectionObjectFieldValueWrapper>
);

const EnhancedCollectionObjectFieldDate = React.memo(CollectionObjectFieldDate);

export default EnhancedCollectionObjectFieldDate;
