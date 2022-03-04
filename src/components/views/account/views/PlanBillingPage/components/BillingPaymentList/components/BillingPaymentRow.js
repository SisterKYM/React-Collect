import React from 'react';

const BillingPaymentRow = ({amount, date, hostedInvoiceUrl}) => (
  <li className="flex ph3-ns pt2-5 pb1 items-center bt b--gray-300">
    <div className="w-50 text-16">{date}</div>
    <div className="w-20 text-16">{amount}</div>
    <div className="w-30 tr text-14">
      <a href={hostedInvoiceUrl} target="_blank" rel="noopener noreferrer">
        Receipt
      </a>
    </div>
  </li>
);

const EnhancedBillingPaymentRow = React.memo(BillingPaymentRow);

export default EnhancedBillingPaymentRow;
