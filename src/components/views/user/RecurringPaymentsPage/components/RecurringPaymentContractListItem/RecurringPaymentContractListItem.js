import {Link} from 'react-router-dom';
import {startCase} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {RecurringHeader} from 'elements';
import {currency} from 'helpers/numbers';
import PaymentMethodInfoHelpers from 'helpers/PaymentMethodInfoHelpers';
import RecurringPaymentFormatter from 'helpers/RecurringPaymentFormatter';

import {
  RecurringDetails,
  RecurringPaymentInvoiceList,
  RecurringPaymentPaymentMethods,
  RecurringPaymentStatus,
} from './components';

const RecurringPaymentContractListItem = ({
  className,
  recurringPaymentContract,
  paymentMethods,
  updatePaymentStatus,
  onUpdatePaymentSource,
  onCancelFuturePayments,
  onRetryFailedInvoice,
}) => {
  const amount = recurringPaymentContract.metadata.amount_pennies / 100;
  const recurringLabels = RecurringPaymentFormatter.getLabels(
    recurringPaymentContract.options
  );

  return (
    <div className={cx('pv3', className)}>
      <div className="flex-ns">
        <div className="w-50-ns">
          <RecurringHeader
            isRecurring
            iconSize={14}
            iconStyle={{top: 2}}
            message={
              <Link to={`/c/${recurringPaymentContract.tab_item.tab.slug}`}>
                {recurringPaymentContract.tab_item.name}
              </Link>
            }
          />
        </div>
        <div className="w-50-ns">
          {currency(amount)} / {recurringLabels.repeat}
        </div>
      </div>
      <p className="f7">
        Paid to:{' '}
        <a
          href={`mailto:${recurringPaymentContract.tab_item.tab.user.email}?subject=${recurringPaymentContract.tab_item.name}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {recurringPaymentContract.tab_item.tab.user.name}
        </a>
      </p>
      <ul className="mv3">
        <RecurringPaymentPaymentMethods
          recurringPaymentContractId={recurringPaymentContract.id}
          paymentMethod={PaymentMethodInfoHelpers.getPaymentMethod({
            sources: paymentMethods,
            stripeId: recurringPaymentContract.stripe_source,
          })}
          paymentMethods={paymentMethods}
          updatePaymentStatus={updatePaymentStatus}
          onUpdatePaymentSource={onUpdatePaymentSource}
        />
        <RecurringDetails title="Starting" text={recurringLabels.start} />
        <RecurringDetails
          title="Repeating Every"
          text={startCase(
            `${
              Number.isNaN(Number.parseInt(recurringLabels.repeat, 10))
                ? '1 '
                : ''
            }${recurringLabels.repeat}`
          )}
        />
        <RecurringDetails title="Ending" text={recurringLabels.end} />
        <RecurringPaymentStatus
          recurringPaymentContract={recurringPaymentContract}
          onCancelFuturePayments={onCancelFuturePayments}
        />
      </ul>
      {recurringPaymentContract.recurring_payment_invoices.length !== 0 && (
        <RecurringPaymentInvoiceList
          recurringPaymentInvoices={
            recurringPaymentContract.recurring_payment_invoices
          }
          paymentMethods={paymentMethods}
          onRetryFailedInvoice={onRetryFailedInvoice}
        />
      )}
    </div>
  );
};

RecurringPaymentContractListItem.propTypes = {
  className: PropTypes.string,
  recurringPaymentContract: PropTypes.object,
  paymentMethods: PropTypes.object,
  onUpdatePaymentSource: PropTypes.func,
  onCancelFuturePayments: PropTypes.func,
  onRetryFailedInvoice: PropTypes.func,
  updatePaymentStatus: PropTypes.shape({
    meta: PropTypes.shape({
      contractId: PropTypes.number,
      sourceId: PropTypes.string,
    }),
    value: PropTypes.string,
  }),
};

const EnhancedRecurringPaymentContractListItem = React.memo(
  RecurringPaymentContractListItem
);

export default EnhancedRecurringPaymentContractListItem;
