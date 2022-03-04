import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {RecurringHeader} from 'elements';
import DateHelpers from 'helpers/DateHelpers';
import PaymentMethodInfoHelpers from 'helpers/PaymentMethodInfoHelpers';

const formatPaymentMethodText = (paymentMethod, stripeId) => {
  const method = PaymentMethodInfoHelpers.getPaymentMethodType({
    paymentMethod,
    stripeId,
  });

  if (!paymentMethod) {
    return method;
  }

  return `${method} **${paymentMethod.last4}`;
};

const RecurringPaymentInvoiceListItem = ({
  className,
  paymentMethods,
  recurringPaymentInvoice,
  retry,
}) => {
  const failed = recurringPaymentInvoice.status === 'failed';
  const {payments} = recurringPaymentInvoice;
  const payment = payments[payments.length - 1];
  const stripeId = payment && payment.stripe_payment_source_id;
  const paymentMethod = PaymentMethodInfoHelpers.getPaymentMethod({
    sources: paymentMethods,
    stripeId,
  });

  return (
    <li className={cx('flex-ns', className)}>
      <div className="flex w-50-ns">
        <div className="w-50">
          <RecurringHeader
            message={DateHelpers.format(
              recurringPaymentInvoice.metadata.due_date
            )}
          />
        </div>
        <div className="w-50 tr tl-ns">
          {formatPaymentMethodText(paymentMethod, stripeId)}
        </div>
      </div>
      <div className="flex w-50-ns">
        <div className="w-50">{recurringPaymentInvoice.status}</div>
        <div className="w-50 tr tl-ns">
          {failed ? (
            <span className="tint pointer" onClick={retry}>
              retry this payment
            </span>
          ) : (
            payment && (
              <Link target="_blank" to={`/user/payments/${payment.id}/details`}>
                view
              </Link>
            )
          )}
        </div>
      </div>
    </li>
  );
};

RecurringPaymentInvoiceListItem.propTypes = {
  className: PropTypes.string,
  recurringPaymentInvoice: PropTypes.object,
  retry: PropTypes.func,
};

const EnhancedRecurringPaymentInvoiceListItem = React.memo(
  RecurringPaymentInvoiceListItem
);

export default EnhancedRecurringPaymentInvoiceListItem;
