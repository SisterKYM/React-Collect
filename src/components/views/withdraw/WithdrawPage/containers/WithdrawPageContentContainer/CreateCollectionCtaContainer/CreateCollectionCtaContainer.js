import React from 'react';

import {CreateCollectionCta} from './components';

const CreateCollectionCtaContainer = () => (
  <CreateCollectionCta collectionCreatePath="/collections" />
);

const EnhancedCreateCollectionCtaContainer = React.memo(
  CreateCollectionCtaContainer
);

export default EnhancedCreateCollectionCtaContainer;
