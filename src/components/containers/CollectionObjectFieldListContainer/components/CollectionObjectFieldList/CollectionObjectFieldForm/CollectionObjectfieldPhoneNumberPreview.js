import React from 'react';

import {CollectionObjectFieldPhoneInput} from 'elements';

const CollectionObjectfieldPhoneNumberPreview = ({className}) => (
  <CollectionObjectFieldPhoneInput disabled className={className} />
);

const EnhancedCollectionObjectfieldPhoneNumberPreview = React.memo(
  CollectionObjectfieldPhoneNumberPreview
);

export default EnhancedCollectionObjectfieldPhoneNumberPreview;
