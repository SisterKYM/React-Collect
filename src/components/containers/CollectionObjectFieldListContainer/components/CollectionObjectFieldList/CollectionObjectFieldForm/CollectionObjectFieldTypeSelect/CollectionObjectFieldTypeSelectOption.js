import {components} from 'react-select';
import React from 'react';

const CollectionObjectFieldTypeSelectOption = ({data, children, ...props}) => (
  <components.Option {...props}>
    <img className="mr2" alt="Select type" src={data.icon} />
    <span className="f-small">{children}</span>
    <style jsx>{`
      img {
        width: 16px;
      }
    `}</style>
  </components.Option>
);

const EnhancedCollectionObjectFieldTypeSelectOption = React.memo(
  CollectionObjectFieldTypeSelectOption
);

export default EnhancedCollectionObjectFieldTypeSelectOption;
