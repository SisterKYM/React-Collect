import React from 'react';
import queryString from 'query-string';

import {Modal, ModalCloseButton} from 'elements';

import {PrintShippingLabelSummaryContainer} from './containers';

const PrintShippingLabelSummaryPage = ({history, location, match}) => {
  const firstVisit = React.useMemo(
    () => queryString.parse(location.search).firstVisit,
    [location.search]
  );

  const handleReprintShippingLabel = React.useCallback(() => {
    const tab = window.open(
      `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
      }/collection/${match.params.owner}/${
        match.params.collection
      }/shipping-label/${match.params.payment}`
    );
    tab.focus();
  }, [match]);

  return (
    <Modal onDismiss={history.goBack}>
      <ModalCloseButton onClick={history.goBack} />
      <div className="h-100 ph4 pv5 bg-gray-200">
        <PrintShippingLabelSummaryContainer
          collectionOwnerId={match.params.owner}
          collectionId={match.params.collection}
          paymentId={match.params.payment}
          firstVisit={firstVisit}
          onReprintShippingLabel={handleReprintShippingLabel}
        />
      </div>
    </Modal>
  );
};

export default PrintShippingLabelSummaryPage;
