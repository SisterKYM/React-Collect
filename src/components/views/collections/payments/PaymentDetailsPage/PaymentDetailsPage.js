import React from 'react';

import {Modal} from 'elements';

import {PaymentDetailsContainer} from './containers';

const PaymentDetailsPage = ({match, history}) => {
  const handleViewRefunds = React.useCallback(() => {
    history.push(`/collections/payments/${match.params.payment}/refunds`);
  }, [history, match]);

  const handleViewRefund = React.useCallback(
    (paymentItem) => {
      history.push({
        pathname: `/collections/payments/${match.params.payment}/refunds`,
        state: {
          selectedPaymentItemId: paymentItem.id,
        },
      });
    },
    [history, match]
  );

  const handleOpenPaymentReport = React.useCallback(() => {
    const path = `/collections/payments/${match.params.payment}/report`;
    const reportUrl = `${window.location.protocol}//${
      window.location.hostname
    }${window.location.port ? `:${window.location.port}` : ''}${path}`;
    const reportWindow = window.open(reportUrl, 'blank');

    reportWindow.focus();
  }, [match]);

  const handleDismiss = React.useCallback(() => {
    history.push(`/collections/payments`);
  }, [history]);

  return (
    <Modal onDismiss={handleDismiss}>
      <PaymentDetailsContainer
        paymentId={Number(match.params.payment)}
        onViewRefund={handleViewRefund}
        onViewRefunds={handleViewRefunds}
        onOpenPaymentReport={handleOpenPaymentReport}
        onDismiss={handleDismiss}
      />
    </Modal>
  );
};

const EnhancedPaymentDetailsPage = React.memo(PaymentDetailsPage);

export default EnhancedPaymentDetailsPage;
