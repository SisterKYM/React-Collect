import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import {PAYMENT_METHOD_LABELS} from 'views/collection/constants';
import {PAYMENT_METHOD_TOOLTIPS} from 'views/collection/manage/constants';
import {RecurringHeader, Tooltip} from 'elements';
import {currency} from 'helpers/numbers';

const PaymentToOtherListItem = ({payment}) => {
  const refunded = (payment.total_refund || 0) > 0;
  const fullyRefunded = (refunded && payment.fully_refunded) || false;
  const failed = payment.status === 'failed';
  const paymentToOtherDetailsLinkTitle = React.useMemo(() => {
    if (refunded) {
      return fullyRefunded ? 'Refunded' : 'Partial Refund';
    }
    if (failed) {
      return 'Failed';
    }

    return 'View Order';
  }, [fullyRefunded, failed, refunded]);
  const tooltip = refunded
    ? PAYMENT_METHOD_TOOLTIPS.refunded[fullyRefunded ? 'fully' : 'partial']({
        payment,
      })
    : null;

  return (
    <li className="flex flex-wrap pv3 justify-between items-center bb b--gray-300">
      <div className="w-40 lh-copy">
        <RecurringHeader
          isRecurring={Boolean(
            _.get(
              payment,
              'recurring_payment_invoice.recurring_payment_contract_id'
            )
          )}
          iconSize={14}
          iconStyle={{top: 2}}
          message={
            <Link to={`/c/${payment.tab.slug}`}>
              <h4 className="f6 f5-ns avenir-roman">{payment.tab.name}</h4>
            </Link>
          }
        />
        <div className="f6">
          Paid to:{' '}
          <a
            href={`mailto:${payment.tab.user.email}?subject=${payment.tab.name}`}
          >
            {payment.tab.user.name}
          </a>
        </div>
        <div className="f9-s f6-ns avenir-light gray-500">
          {moment(payment.created_at).format('M/D/YYYY')}
        </div>
      </div>
      <div className="w-40 avenir-roman lh-copy">
        <span>
          {currency(
            payment.total + payment.member_fee - payment.member_fee_refund || 0
          )}
        </span>
        <div className="f9-s f6-ns avenir-light gray-500">
          {PAYMENT_METHOD_LABELS[payment.payment_method]}
        </div>
      </div>
      <div className="w-20 tc">
        <Link className="f6" to={`/user/payments/${payment.id}/details`}>
          {tooltip ? (
            <Tooltip
              text={tooltip}
              style={{
                bottom: 25,
                width: 240,
                left: -30,
              }}
            >
              {paymentToOtherDetailsLinkTitle}
            </Tooltip>
          ) : (
            paymentToOtherDetailsLinkTitle
          )}
        </Link>
      </div>
    </li>
  );
};

const EnhancedPaymentToOtherListItem = Object.assign(
  React.memo(PaymentToOtherListItem),
  {
    propTypes: {
      payment: PropTypes.shape({
        amount: PropTypes.number,
        currency: PropTypes.string,
        date: PropTypes.instanceOf(Date),
        id: PropTypes.number,
        eventName: PropTypes.string,
        paidTo: PropTypes.string,
      }),
    },
  }
);

export default EnhancedPaymentToOtherListItem;
