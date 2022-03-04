import React from 'react';

import {PayerOverview, RefundsTable} from 'elements';

const PaymentToOthersRefunds = ({selectedRefundId, payment, onViewRefund}) => (
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

const EnhancedPaymentToOthersRefunds = React.memo(PaymentToOthersRefunds);

export default EnhancedPaymentToOthersRefunds;
