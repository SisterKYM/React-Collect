import {FaQuestionCircle} from 'react-icons/fa';
import {get} from 'lodash';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import {
  DISPUTE_STATUSES,
  PAYMENT_METHOD_STATUSES,
  PAYMENT_METHOD_TOOLTIPS,
  PAYMENT_STATUS_COLORS,
} from 'views/collection/manage/constants';
import {NewTooltip} from 'elements';
import config from 'config';

const PaymentStatus = ({className, userView, payment}) => {
  const totalRefund = payment.total_refund || 0;
  const fullyRefunded = payment.fully_refunded || false;
  const refundedMethod = totalRefund || fullyRefunded ? 'refunded' : '';
  const refunded = Boolean(refundedMethod);
  const refundedStatus = fullyRefunded ? 'fully' : 'partial';
  const status = totalRefund ? refundedStatus : payment.status;
  const method = refundedMethod || payment.payment_method;
  const dispute = payment.dispute;
  const availableOn =
    payment.available_on &&
    moment.utc(payment.available_on).add(1, 'day').format('M/D/YYYY');
  const title = dispute
    ? DISPUTE_STATUSES[dispute.status]
    : get(PAYMENT_METHOD_STATUSES, `${method}.${status}`, status);

  const tooltip = dispute
    ? () => (
        <>
          Payment Disputed {moment(dispute.created_at).format('M/D/YYYY')}
          <br />
          <a
            href={config.links.disputesSupport}
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn about disputes
          </a>
        </>
      )
    : get(PAYMENT_METHOD_TOOLTIPS, `${method}.${status}`, status);

  const tooltipId = `payment-${payment.id}-status-tooltip-id`;

  return (
    <>
      {typeof tooltip === 'function' && (
        <NewTooltip
          multiline
          id={tooltipId}
          clickable={Boolean(dispute)}
          type={dispute ? 'light' : 'dark'}
          getContent={() => tooltip({userView, payment, availableOn})}
        />
      )}
      <span
        data-tip="data-tip"
        data-for={tooltipId}
        className={cx(
          'f6 avenir-light mr2',
          refunded ? 'tint' : 'payment-status-color',
          refundedMethod && 'pointer',
          className
        )}
      >
        {title}
        {Boolean(dispute) && (
          <FaQuestionCircle className="ml1 accent" size={12} />
        )}
      </span>
      <style jsx>{`
        .payment-status-color {
          color: ${PAYMENT_STATUS_COLORS[dispute ? 'disputed' : status]};
        }
      `}</style>
    </>
  );
};

const EnhancedPaymentStatus = React.memo(PaymentStatus);

export default EnhancedPaymentStatus;
