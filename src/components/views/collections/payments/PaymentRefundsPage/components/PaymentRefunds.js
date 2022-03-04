import React from 'react';

import {PayerOverview, RefundsTable} from 'elements';

const PaymentRefunds = ({selectedRefundId, payment, onViewRefund}) => (
  <>
    <PayerOverview className="ph2 pv3" tabMember={payment.tab_member} />
    <RefundsTable
      className="mb4"
      refunds={payment.refunds}
      selectedRefundId={selectedRefundId}
      onViewRefund={onViewRefund}
    />
  </>
);

const EnhancedPaymentRefunds = React.memo(PaymentRefunds);

export default EnhancedPaymentRefunds;
