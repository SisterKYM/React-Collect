import React from 'react';

const CollectionObjectFieldActionBarVerticalSeparator = () => (
  <>
    <div className="mh3 bg-gray-400" />
    <style jsx>{`
      div {
        width: 1px;
        height: 40px;
      }
    `}</style>
  </>
);

const EnhancedCollectionObjectFieldActionBarVerticalSeparator = React.memo(
  CollectionObjectFieldActionBarVerticalSeparator
);

export default EnhancedCollectionObjectFieldActionBarVerticalSeparator;
