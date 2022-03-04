import React from 'react';

import CollectionObjectFieldValueHeading from './CollectionObjectFieldValueHeading';
import CollectionObjectFieldValueWrapper from './CollectionObjectFieldValueWrapper';
import Input from '../Input';

const CollectionObjectFieldOpenText = ({
  className,
  small,
  sortClassName,
  editable,
  noHorizontalMargin,
  inputVisible,
  field,
  inputDisplayBlock,
  onClick,
  ...props
}) => (
  <CollectionObjectFieldValueWrapper
    sortClassName={sortClassName}
    backgroundTransparent={editable}
    noHorizontalMargin={noHorizontalMargin}
    onClick={onClick}
  >
    <CollectionObjectFieldValueHeading small={small} field={field} />
    {inputVisible && (
      <div className="mt2">
        <Input
          border
          style={{fontSize: small ? '16px' : '18px'}}
          borderRadius
          {...props}
        />
      </div>
    )}
  </CollectionObjectFieldValueWrapper>
);

const EnhancedCollectionObjectFieldOpenText = React.memo(
  CollectionObjectFieldOpenText
);

export default EnhancedCollectionObjectFieldOpenText;
