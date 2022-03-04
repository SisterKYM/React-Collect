import React from 'react';

import {CollectionObjectFieldDateInput} from 'elements';

const CollectionObjectFieldDateInputPreview = ({className}) => (
  <CollectionObjectFieldDateInput disabled className={className} />
);

const EnhancedCollectionObjectFieldDateInputPreview = React.memo(
  CollectionObjectFieldDateInputPreview
);

export default EnhancedCollectionObjectFieldDateInputPreview;
