import {compose} from 'recompose';
import {connect} from 'react-redux';
import React from 'react';

import {ExpandableSidebarLayout} from 'layout';
import {GET_PAYMENT_TO_OTHERS} from 'redux/modules/session/constants';
import {StatefulView, RefundOverview} from 'elements';
import {getPaymentToOthers} from 'redux/modules/session/actions';
import asyncConnect from 'helpers/asyncConnect';

import {PaymentToOthersRefunds} from '../components';

const RefundsManageContainer = ({
  status,
  selectedPaymentItemId,
  payment,
  onDismiss,
}) => {
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
          <PaymentToOthersRefunds
            selectedRefundId={selectedRefund ? selectedRefund.id : null}
            payment={payment}
            onViewRefund={handleViewRefund}
          />
        </ExpandableSidebarLayout>
      )}
    </StatefulView>
  );
};

const enhance = compose(
  asyncConnect((props) => [
    {
      key: GET_PAYMENT_TO_OTHERS,
      promise: getPaymentToOthers,
      payload: {
        paymentToOtherId: props.paymentId,
      },
    },
  ]),
  connect((state) => ({
    status: state.async.statuses[GET_PAYMENT_TO_OTHERS],
    payment: state.session.paymentToOthers,
  }))
);

const EnhancedRefundsManageContainer = enhance(RefundsManageContainer);

export default EnhancedRefundsManageContainer;
