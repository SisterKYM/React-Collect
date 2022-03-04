import React from 'react';

import {Modal} from 'elements';

import {PaymentToOthersDetailsContainer} from './containers';

const PaymentToOthersDetailsPage = ({match, history}) => {
  const handleViewRefunds = React.useCallback(() => {
    history.push(`/user/payments/${match.params.payment}/refunds`);
  }, [history, match]);

  const handleViewRefund = React.useCallback(
    paymentItem => {
      history.push({
        pathname: `/user/payments/${match.params.payment}/refunds`,
        state: {
          selectedPaymentItemId: paymentItem.id,
        },
      });
    },
    [history, match]
  );

  const handleOpenPaymentReport = React.useCallback(() => {
    const path = `/user/payments/${match.params.payment}/report`;
    const reportUrl = `${window.location.protocol}//${
      window.location.hostname
    }${window.location.port ? `:${window.location.port}` : ''}${path}`;
    const reportWindow = window.open(reportUrl, 'blank');

    reportWindow.focus();
  }, [match]);

  const handleDismiss = React.useCallback(() => {
    history.push(`/user/payments`);
  }, [history]);

  return (
    <Modal onDismiss={handleDismiss}>
      <PaymentToOthersDetailsContainer
        paymentId={Number(match.params.payment)}
        onViewRefund={handleViewRefund}
        onViewRefunds={handleViewRefunds}
        onOpenPaymentReport={handleOpenPaymentReport}
        onDismiss={handleDismiss}
      />
    </Modal>
  );
};

const EnhancedPaymentToOthersDetailsPage = React.memo(
  PaymentToOthersDetailsPage
);

export default EnhancedPaymentToOthersDetailsPage;
