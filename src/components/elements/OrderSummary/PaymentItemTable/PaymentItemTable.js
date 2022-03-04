import React from 'react';
import _ from 'lodash';

import StyledTable from 'elements/StyledTable';

import PaymentItemTableRow from './PaymentItemTableRow';
import PaymentItemTableShippingInfoRow from './PaymentItemTableShippingInfoRow';

const PaymentItemTable = ({
  fieldViewsVisiblePaymentItemId,
  paymentItems,
  scheduledInvoices,
  shippingInfo,
  refunds,
  onViewFieldViews,
  onViewRefund,
}) => {
  const hasItemFieldViews = React.useMemo(
    () =>
      _.sum(paymentItems.map(({item_field_views}) => item_field_views.length)) +
        _.sum(
          paymentItems.map(
            (i) => Object.keys(i.detail?.variant?.optionValues || {}).length
          )
        ) !==
      0,
    [paymentItems]
  );

  const renderPaymentItem = React.useCallback(
    (paymentItem) => {
      const paymentItemRefunds = refunds.filter((refund) => {
        const refundedPaymentItemIds = refund.detail.items
          .filter(({amount}) => amount > 0)
          .map(({payment_item_id}) => String(payment_item_id));

        return refundedPaymentItemIds.includes(String(paymentItem.id));
      });

      return (
        <PaymentItemTableRow
          key={paymentItem.id}
          fieldViewsVisible={paymentItem.id === fieldViewsVisiblePaymentItemId}
          fieldViewsCellVisible={hasItemFieldViews}
          paymentItem={paymentItem}
          paymentItemRefunds={paymentItemRefunds}
          scheduledInvoices={scheduledInvoices}
          onViewFieldViews={onViewFieldViews}
          onViewRefund={onViewRefund}
        />
      );
    },
    [
      fieldViewsVisiblePaymentItemId,
      hasItemFieldViews,
      onViewFieldViews,
      onViewRefund,
      refunds,
      scheduledInvoices,
    ]
  );

  return (
    <StyledTable.Table>
      <StyledTable.Head primary>
        <StyledTable.Row head>
          <StyledTable.HeadCell className="f7">Item(s)</StyledTable.HeadCell>
          <StyledTable.HeadCell className="tr f7">
            Quantity
          </StyledTable.HeadCell>
          <StyledTable.HeadCell className="tr f7">Price</StyledTable.HeadCell>
          <StyledTable.HeadCell className="tr f7">
            Subtotal
          </StyledTable.HeadCell>
          {hasItemFieldViews && (
            <StyledTable.HeadCell className="f7 tr">
              Responses
            </StyledTable.HeadCell>
          )}
        </StyledTable.Row>
      </StyledTable.Head>
      <tbody>
        {paymentItems.map((x) => renderPaymentItem(x))}
        {Boolean(shippingInfo.charge) && (
          <PaymentItemTableShippingInfoRow
            placeholderCellVisible={hasItemFieldViews}
            shippingInfo={shippingInfo}
            shippingInfoRefunds={[]}
            onViewRefund={onViewRefund}
          />
        )}
      </tbody>
    </StyledTable.Table>
  );
};

const EnhancedPaymentItemTable = React.memo(PaymentItemTable);

export default EnhancedPaymentItemTable;
