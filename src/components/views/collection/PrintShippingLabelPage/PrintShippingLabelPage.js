import React from 'react';

import {Elements} from 'elements/Stripe';
import {Modal, ModalCloseButton} from 'elements';

import {PrintShippingLabelContainer} from './containers';
import {PrintShippingLabelHeader} from './components';

const PrintShippingLabelPage = ({history, location, match}) => {
  const handleRedirectToPrintShippingLabelSummaryPage = React.useCallback(() => {
    const printShippingLabelSummaryPathname = location.pathname.replace(
      '/print-shipping-label/',
      '/print-shipping-label-summary/'
    );

    history.replace(`${printShippingLabelSummaryPathname}?firstVisit=true`);
  }, [history, location.pathname]);

  const handleViewOrderSummary = React.useCallback(() => {
    const openedWindow = window.open(
      `/collection/${match.params.owner}/${match.params.collection}/payment-report/${match.params.payment}`,
      '_blank'
    );
    openedWindow.focus();
  }, [match]);

  return (
    <Modal onDismiss={history.goBack}>
      <ModalCloseButton onClick={history.goBack} />
      <div className="min-h-100 ph4 pv5 bg-gray-200">
        <PrintShippingLabelHeader
          className="mb3"
          onViewOrderSummary={handleViewOrderSummary}
        />
        <Elements>
          <PrintShippingLabelContainer
            collectionId={match.params.collection}
            paymentId={match.params.payment}
            onRedirectToPrintShippingLabelSummaryPage={
              handleRedirectToPrintShippingLabelSummaryPage
            }
          />
        </Elements>
      </div>
    </Modal>
  );
};

export default PrintShippingLabelPage;
