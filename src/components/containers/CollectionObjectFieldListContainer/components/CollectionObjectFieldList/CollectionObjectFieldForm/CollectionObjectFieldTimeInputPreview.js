import React from 'react';

import {CollectionObjectFieldTimeInput} from 'elements';

const CollectionObjectFieldTimeInputPreview = ({className}) => (
  <CollectionObjectFieldTimeInput disabled className={className} />
);

const EnhancedCollectionObjectFieldTimeInputPreview = React.memo(
  CollectionObjectFieldTimeInputPreview
);

export default EnhancedCollectionObjectFieldTimeInputPreview;
