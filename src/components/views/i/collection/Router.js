import {Route} from 'react-router-dom';
import React from 'react';

import CollectionSummaryPage from './CollectionSummaryPage';
import DeleteCollectionPage from './DeleteCollectionPage';

export default React.memo(() => (
  <>
    <Route
      path="*/i/collection/:owner/:collection/summary"
      component={CollectionSummaryPage}
    />
    <Route
      path="*/i/collection/:owner/:collection/delete"
      component={DeleteCollectionPage}
    />
  </>
));
