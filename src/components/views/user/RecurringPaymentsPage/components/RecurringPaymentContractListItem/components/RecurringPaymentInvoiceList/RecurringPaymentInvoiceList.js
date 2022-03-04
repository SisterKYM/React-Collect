import _ from 'lodash';
import React from 'react';

import RecurringPaymentInvoiceListItem from './RecurringPaymentInvoiceListItem';

const RecurringPaymentInvoiceList = ({
  paymentMethods,
  recurringPaymentInvoices,
  onRetryFailedInvoice,
}) => (
  <ul className="f6">
    {_.orderBy(
      recurringPaymentInvoices,
      ({metadata}) => new Date(metadata.due_date),
      ['desc']
    ).map((recurringPaymentInvoice, idx) => (
      <RecurringPaymentInvoiceListItem
        key={recurringPaymentInvoice.id}
        className={idx !== 0 ? 'mt1' : ''}
        recurringPaymentInvoice={recurringPaymentInvoice}
        paymentMethods={paymentMethods}
        retry={() => {
          onRetryFailedInvoice(recurringPaymentInvoice.id);
        }}
      />
    ))}
  </ul>
);

const EnhancedRecurringPaymentInvoiceList = React.memo(
  RecurringPaymentInvoiceList
);

export default EnhancedRecurringPaymentInvoiceList;
