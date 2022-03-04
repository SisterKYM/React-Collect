import {components} from 'react-select';
import React from 'react';

const CollectionObjectFieldTypeSelectSingleValue = ({
  data,
  children,
  ...props
}) => (
  <components.SingleValue {...props}>
    <span className="flex items-center f-small">
      <img alt="Select single" className="mr2" src={data.icon} />
      {children}
    </span>
    <style jsx>{`
      img {
        width: 16px;
      }
    `}</style>
  </components.SingleValue>
);

const EnhancedCollectionObjectFieldTypeSelectSingleValue = React.memo(
  CollectionObjectFieldTypeSelectSingleValue
);

export default EnhancedCollectionObjectFieldTypeSelectSingleValue;
