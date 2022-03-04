import React from 'react';

import PaymentItemTableHeader from './PaymentItemTableHeader';
import PaymentItemTableRow from './PaymentItemTableRow';

const PaymentItemTable = ({paymentItems, refunds}) => (
  <>
    <PaymentItemTableHeader />
    {paymentItems.map(paymentItem => (
      <PaymentItemTableRow
        key={paymentItem.id}
        paymentItem={paymentItem}
        refunds={refunds.filter(refund => {
          const refundedPaymentItemIds = refund.detail.items
            .filter(({amount}) => amount > 0)
            .map(({payment_item_id}) => String(payment_item_id));

          return refundedPaymentItemIds.includes(String(paymentItem.id));
        })}
      />
    ))}
  </>
);

const EnhancedPaymentItemTable = React.memo(PaymentItemTable);

export default EnhancedPaymentItemTable;
