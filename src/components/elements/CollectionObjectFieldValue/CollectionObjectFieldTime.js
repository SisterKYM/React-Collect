import cx from 'classnames';
import React from 'react';

import CollectionObjectFieldTimeInput from '../CollectionObjectFieldTimeInput';
import CollectionObjectFieldValueHeading from './CollectionObjectFieldValueHeading';
import CollectionObjectFieldValueWrapper from './CollectionObjectFieldValueWrapper';

const CollectionObjectFieldTime = ({
  className,
  headingClassName,
  sortClassName,
  inputClassName,
  small,
  noHorizontalMargin,
  editable,
  field,
  input,
  value,
  onChange,
  onClick,
  onClickInput,
}) => (
  <CollectionObjectFieldValueWrapper
    sortClassName={sortClassName}
    backgroundTransparent={editable}
    noHorizontalMargin={noHorizontalMargin}
    onClick={onClick}
  >
    <CollectionObjectFieldValueHeading
      className={headingClassName}
      small={small}
      field={field}
    />
    <div className={className} onClick={onClickInput}>
      <CollectionObjectFieldTimeInput
        className={cx('mt2', inputClassName)}
        small={small}
        input={input}
        value={value}
        onChange={onChange}
      />
    </div>
  </CollectionObjectFieldValueWrapper>
);

const EnhancedCollectionObjectFieldTime = React.memo(CollectionObjectFieldTime);

export default EnhancedCollectionObjectFieldTime;
