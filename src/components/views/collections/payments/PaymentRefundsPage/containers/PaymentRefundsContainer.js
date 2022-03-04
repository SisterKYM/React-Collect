import React from 'react';
import {useResource} from 'rest-hooks';

import {ExpandableSidebarLayout} from 'layout';
import {StatefulView, RefundOverview} from 'elements';
import UserPaymentsResource from 'resources/UserPaymentResource';

import {PaymentRefunds} from '../components';

const RefundsManageContainer = ({
  status,
  selectedPaymentItemId,
  onDismiss,
  paymentId,
}) => {
  const payment = useResource(UserPaymentsResource.detailShape(), {
    id: paymentId,
  });
  const [selectedRefund, setSelectedRefund] = React.useState(null);

  React.useEffect(() => {
    if (payment && payment.payment_method === 'cash') {
      onDismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  React.useEffect(() => {
    if (selectedPaymentItemId && payment) {
      const nextSelectedRefund = payment.refunds.find((refund) => {
        const refundPaymentItemIds = refund.detail.items.map(
          ({payment_item_id}) => payment_item_id
        );

        return refundPaymentItemIds.includes(selectedPaymentItemId);
      });

      setSelectedRefund(nextSelectedRefund);
    }
  }, [payment, selectedPaymentItemId]);

  const handleViewRefund = React.useCallback((refund) => {
    setSelectedRefund((prevSelectedRefund) =>
      prevSelectedRefund && prevSelectedRefund.id === refund.id ? null : refund
    );
  }, []);

  const handleDismissRefundView = React.useCallback(() => {
    setSelectedRefund(null);
  }, [setSelectedRefund]);

  return (
    <StatefulView status={status} resultCount={payment ? 1 : 0}>
      {payment && (
        <ExpandableSidebarLayout
          sidebarVisible={Boolean(selectedRefund)}
          sidebar={
            <RefundOverview
              tabMember={payment.tab_member}
              refund={selectedRefund}
            />
          }
          title={payment.tab.name}
          heading="Refunds"
          sidebarTitle="Refund Issued"
          onClickClose={onDismiss}
          onClickCloseSidebar={handleDismissRefundView}
        >
          <PaymentRefunds
            selectedRefundId={selectedRefund ? selectedRefund.id : null}
            payment={payment}
            onViewRefund={handleViewRefund}
          />
        </ExpandableSidebarLayout>
      )}
    </StatefulView>
  );
};

const EnhancedRefundsManageContainer = React.memo(RefundsManageContainer);

export default EnhancedRefundsManageContainer;
