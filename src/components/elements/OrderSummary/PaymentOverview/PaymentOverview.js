import React from 'react';
import _ from 'lodash';
import cx from 'classnames';
import moment from 'moment';
import {useRouteMatch} from 'react-router-dom';

import {PAYMENT_METHOD_LABELS} from 'views/collection/constants';
import {Checkbox, CommonButton} from 'elements';

import PaymentOverviewInvoiceRow from './PaymentOverviewInvoiceRow';

const PaymentOverview = ({
  collectionName,
  className,
  payment,
  onViewRefunds,
  onReceiveCashOrCheckPayment,
  shipTo,
}) => {
  const [paymentReceived, setPaymentReceived] = React.useState(
    payment.status === 'available'
  );

  const createdAtMoment = moment(payment.created_at);
  const paymentMethodLabel = PAYMENT_METHOD_LABELS[payment.payment_method];
  const {shipping_info: shippingInfo} = payment;
  const shipped =
    shippingInfo &&
    shippingInfo.shippingMethod === 'toMe' &&
    shippingInfo.shipTo.name;
  const discountCodes = Object.keys(payment.discounts || {});
  const hasAdditionalPayments =
    shipped ||
    Boolean(payment.total_discounts) ||
    Boolean(payment.total_taxes) ||
    (payment.subtotal !== 0 && Boolean(payment.total_refund));

  const match = useRouteMatch();

  return (
    <div>
      <div className="fl mr6">
        <div className={cx('w20 f6 lh-copy', className)}>
          <div className="mb3 avenir-light">
            <p className="avenir-roman">Collection: {collectionName}</p>
            <p>
              Date:{' '}
              <time dateTime={createdAtMoment.format()}>
                {createdAtMoment.format('M/D/YYYY')}
              </time>
            </p>
            {paymentMethodLabel && <p>Payment Method: {paymentMethodLabel}</p>}
            {payment.dispute && (
              <p className="nowrap brand">
                Payment Disputed:{' '}
                {moment(payment.dispute.created_at).format('M/D/YYYY')},{' '}
                {_.capitalize(_.lowerCase(payment.dispute.status))}
              </p>
            )}
            {onReceiveCashOrCheckPayment && payment.payment_method === 'cash' && (
              <Checkbox
                label={<div className="mt1 tint">Received?</div>}
                checked={paymentReceived}
                onChange={() => {
                  setPaymentReceived(
                    (prevPaymentReceived) => !prevPaymentReceived
                  );
                  onReceiveCashOrCheckPayment();
                }}
              />
            )}
          </div>
          <div className="mb3 avenir-light">
            {(shipped ||
              Boolean(payment.total_discounts) ||
              Boolean(payment.total_taxes)) && (
              <div className="pb2 mb2 bb b--gray-300">
                <PaymentOverviewInvoiceRow
                  title="Subtotal:"
                  value={payment.items_total}
                />
                {Boolean(payment.total_discounts) && (
                  <PaymentOverviewInvoiceRow
                    title={`Discounts: (${discountCodes.join(', ')})`}
                    value={-payment.total_discounts}
                  />
                )}
                {Boolean(payment.total_taxes) && (
                  <PaymentOverviewInvoiceRow
                    title="Tax:"
                    value={payment.total_taxes}
                  />
                )}
                {shipped && (
                  <PaymentOverviewInvoiceRow
                    title="Shipping:"
                    value={shippingInfo.charge}
                  />
                )}
              </div>
            )}
            {payment.subtotal !== 0 && Boolean(payment.total_refund) && (
              <div className="pb2 mb2 bb b--gray-300">
                <PaymentOverviewInvoiceRow
                  title="Gross Amount:"
                  value={payment.subtotal + payment.total_taxes}
                />
                <PaymentOverviewInvoiceRow
                  title="Total Refunds:"
                  value={-payment.total_refund}
                />
              </div>
            )}
            {payment.status === 'failed' && (
              <div className="orange mb1">Payment Failed</div>
            )}
            <PaymentOverviewInvoiceRow
              className="avenir-roman"
              inline={!hasAdditionalPayments}
              title={hasAdditionalPayments ? 'Net Payment:' : 'Payment:'}
              value={payment.status !== 'failed' ? payment.total : 0}
            />
          </div>
          {payment.payment_method !== 'cash' &&
            payment.status !== 'failed' &&
            match.params.owner && (
              <CommonButton
                className="pt-12 bg-gray-250 pointer gray-600"
                onClick={onViewRefunds}
              >
                Refunds
              </CommonButton>
            )}
          <style jsx>{`
            .w20 {
              width: 20rem;
            }
          `}</style>
        </div>
      </div>
      <div className="fl">{shipTo}</div>
    </div>
  );
};

const EnhancedPaymentOverview = React.memo(PaymentOverview);

export default EnhancedPaymentOverview;
