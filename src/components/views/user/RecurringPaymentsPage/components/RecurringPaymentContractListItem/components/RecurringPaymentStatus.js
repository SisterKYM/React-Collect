import React from 'react';
import _ from 'lodash';

import DateHelpers from 'helpers/DateHelpers';
import RecurringPaymentFormatter from 'helpers/RecurringPaymentFormatter';

import RecurringDetails from './RecurringDetails';

const RecurringPaymentStatus = ({
  recurringPaymentContract,
  onCancelFuturePayments,
}) => {
  const nextInvoice = _.minBy(
    recurringPaymentContract.recurring_payment_invoices.filter(
      ({status}) => status === 'scheduled'
    ),
    ({metadata}) => new Date(metadata.due_date)
  );
  const nextInvoiceDueDate = nextInvoice ? nextInvoice.metadata.due_date : null;
  const isNextPayment =
    Boolean(nextInvoiceDueDate) &&
    recurringPaymentContract.status !== 'cancelled';
  const recurringLabelNext = RecurringPaymentFormatter.getLabelsNextFormatted({
    start: recurringPaymentContract.options.start,
    repeat: recurringPaymentContract.options.repeat,
  });

  return (
    <RecurringDetails
      title={isNextPayment ? 'Next Payment' : 'Status'}
      text={
        isNextPayment
          ? DateHelpers.format(nextInvoiceDueDate) || recurringLabelNext
          : _.upperFirst(recurringPaymentContract.status)
      }
    >
      {isNextPayment && (
        <span className="ml2 tint pointer" onClick={onCancelFuturePayments}>
          Cancel future payments
        </span>
      )}
    </RecurringDetails>
  );
};

export default RecurringPaymentStatus;
