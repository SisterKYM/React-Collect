import cx from 'classnames';
import React from 'react';

import CollectionObjectFieldPhoneInput from '../CollectionObjectFieldPhoneInput';
import CollectionObjectFieldValueHeading from './CollectionObjectFieldValueHeading';
import CollectionObjectFieldValueWrapper from './CollectionObjectFieldValueWrapper';

const CollectionObjectFieldPhone = ({
  className,
  headingClassName,
  inputClassName,
  small,
  noHorizontalMargin,
  sortClassName,
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
      <CollectionObjectFieldPhoneInput
        className={cx('mw-100 mt2', inputClassName)}
        small={small}
        input={input}
        value={value}
        onChange={onChange}
      />
    </div>
  </CollectionObjectFieldValueWrapper>
);

const EnhancedCollectionObjectFieldPhone = React.memo(
  CollectionObjectFieldPhone
);

export default EnhancedCollectionObjectFieldPhone;
