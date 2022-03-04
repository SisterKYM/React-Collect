import React, {useMemo} from 'react';

import OrderSummaryPayer from './OrderSummaryPayer';
import OrderSummaryShipTo from './OrderSummaryShipTo';
import PaymentFormTable from './PaymentFormTable';
import PaymentItemTable from './PaymentItemTable';
import PaymentOverview from './PaymentOverview';

const OrderSummary = ({
  collectionName,
  fieldViewsVisiblePaymentObjectId,
  payment,
  paymentNote,
  onPrintShippingLabel,
  onReceiveCashOrCheckPayment,
  onViewFieldViews,
  onViewRefund,
  onViewRefunds,
}) => {
  const shippingInfo = useMemo(() => payment.shipping_info, [
    payment.shipping_info,
  ]);
  const shipToEnabled =
    Boolean(shippingInfo.currentOptions) &&
    shippingInfo.currentOptions.shipToEnabled;
  const paymentItems = useMemo(
    () =>
      payment.payment_items.filter((paymentItem) =>
        Boolean(paymentItem.tab_item)
      ),
    [payment.payment_items]
  );
  const scheduledInvoices = useMemo(() => payment.scheduled_invoices, [
    payment.scheduled_invoices,
  ]);
  const paymentForms = useMemo(
    () =>
      payment.payment_items.filter((paymentItem) =>
        Boolean(paymentItem.tab_form)
      ),
    [payment.payment_items]
  );

  return (
    <>
      <OrderSummaryPayer
        className="ph2 mb4"
        tabMember={payment.tab_member}
        footer={paymentNote}
      />
      <PaymentOverview
        collectionName={collectionName}
        className="ph2 mb4"
        payment={payment}
        onViewRefunds={onViewRefunds}
        onReceiveCashOrCheckPayment={onReceiveCashOrCheckPayment}
        shipTo={
          shipToEnabled && (
            <OrderSummaryShipTo
              shippingMethod={shippingInfo.shippingMethod}
              shipmentPurchased={
                Boolean(payment.shipment) && payment.shipment.purchased
              }
              shipTo={shippingInfo.shipTo}
              onPrintShippingLabel={onPrintShippingLabel}
            />
          )
        }
      />
      {paymentItems.length !== 0 && (
        <div className="cb mb4 overflow-x-auto">
          <PaymentItemTable
            fieldViewsVisiblePaymentItemId={fieldViewsVisiblePaymentObjectId}
            paymentItems={paymentItems}
            scheduledInvoices={scheduledInvoices}
            shippingInfo={shippingInfo}
            refunds={payment.refunds}
            onViewFieldViews={onViewFieldViews}
            onViewRefund={onViewRefund}
          />
        </div>
      )}
      {paymentForms.length !== 0 && (
        <div className="cb overflow-x-auto">
          <PaymentFormTable
            fieldViewsVisiblePaymentFormId={fieldViewsVisiblePaymentObjectId}
            paymentForms={paymentForms}
            onViewFieldViews={onViewFieldViews}
          />
        </div>
      )}
    </>
  );
};

const EnhancedOrderSummary = React.memo(OrderSummary);

export default EnhancedOrderSummary;
