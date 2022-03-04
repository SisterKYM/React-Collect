import React, {useMemo} from 'react';
import moment from 'moment';

import {currency} from 'helpers/numbers';

import {BillingPaymentRow} from './components';

const BillingPaymentList = ({BillingHistory = []}) => {
  const payments = useMemo(
    () =>
      BillingHistory.map(({charge, created, hosted_invoice_url}) => ({
        amount: currency(charge ? charge.amount / 100 : 0),
        date: moment((created || 0) * 1000).format('MM/DD/YYYY'),
        hostedInvoiceUrl: hosted_invoice_url,
      })),
    [BillingHistory]
  );

  return (
    <div>
      <p className="text-14 pb1">Invoices</p>
      <ul>
        {payments.map((payment, idx) => (
          <BillingPaymentRow key={idx} {...payment} />
        ))}
      </ul>
    </div>
  );
};

const EnhancedBillingPaymentList = React.memo(BillingPaymentList);

export default EnhancedBillingPaymentList;
