import React from 'react';

const PaymentsListHeader = () => (
  <div className="payment-row flex">
    <div className="info flex-auto">Collection</div>
    <div className="date">Date</div>
    <div className="method">Method</div>
    <div className="amount pr3 tr">Amount</div>
    <div className="actions" />
  </div>
);

const EnhancedPaymentsListHeader = React.memo(PaymentsListHeader);

export default EnhancedPaymentsListHeader;
