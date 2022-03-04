import React from 'react';

import {Modal} from 'elements';

import {OrderSummaryContainer} from './containers';

const OrderSummaryPage = ({history, match}) => {
  const handleOpenPaymentReport = React.useCallback(() => {
    const path = `/collection/${match.params.owner}/${match.params.collection}/payment-report/${match.params.payment}`;
    const reportUrl = `${window.location.protocol}//${
      window.location.hostname
    }${window.location.port ? `:${window.location.port}` : ''}${path}`;
    const reportWindow = window.open(reportUrl, 'blank');

    reportWindow.focus();
  }, [match]);

  const handlePrintShippingLabel = React.useCallback(() => {
    history.push(
      `/collection/${match.params.owner}/${match.params.collection}/manage/print-shipping-label/${match.params.payment}`
    );
  }, [history, match]);

  const handleViewRefunds = React.useCallback(() => {
    history.push(
      `/collection/${match.params.owner}/${match.params.collection}/manage/payments/${match.params.payment}/refunds`
    );
  }, [history, match]);
  const handleDeletePayment = React.useCallback(() => {
    history.push(
      `/collection/${match.params.owner}/${match.params.collection}/manage/payments/${match.params.payment}/delete`
    );
  }, [history, match]);

  const handleViewRefund = React.useCallback(
    (paymentItem) => {
      history.push({
        pathname: `/collection/${match.params.owner}/${match.params.collection}/manage/payments/${match.params.payment}/refunds`,
        state: {
          selectedPaymentItemId: paymentItem.id,
        },
      });
    },
    [history, match]
  );

  const printFieldViewsPathForPaymentObject = React.useCallback(
    (paymentObject) =>
      `/collection/${match.params.owner}/${match.params.collection}/payment/${match.params.payment}/payment-item/${paymentObject.id}`,
    [match]
  );

  const handleDismiss = React.useCallback(() => {
    history.push(
      `/collection/${match.params.owner}/${match.params.collection}/manage/payments`
    );
  }, [history, match.params.collection, match.params.owner]);

  return (
    <Modal onDismiss={handleDismiss}>
      <OrderSummaryContainer
        collectionId={Number(match.params.collection)}
        paymentId={Number(match.params.payment)}
        onOpenPaymentReport={handleOpenPaymentReport}
        onPrintShippingLabel={handlePrintShippingLabel}
        onViewRefund={handleViewRefund}
        onViewRefunds={handleViewRefunds}
        printFieldViewsPathForPaymentObject={
          printFieldViewsPathForPaymentObject
        }
        onDeletePayment={handleDeletePayment}
        onDismiss={handleDismiss}
      />
    </Modal>
  );
};

const EnhancedOrderSummaryPage = React.memo(OrderSummaryPage);

export default EnhancedOrderSummaryPage;
