import React from 'react';

import {Modal} from 'elements';

import {ItemReportContainer} from './containers';

const ItemReportPage = ({history, match}) => (
  <Modal onDismiss={history.goBack}>
    <ItemReportContainer
      collectionId={match.params.collection}
      itemId={match.params.item}
      onDismiss={history.goBack}
    />
  </Modal>
);

const EnhancedItemReportPage = React.memo(ItemReportPage);

export default EnhancedItemReportPage;
