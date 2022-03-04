import PropTypes from 'prop-types';
import React from 'react';

const BillingPaymentListRow = ({
  echeck,
  amount,
  cardBrand,
  date,
  plan,
  last4,
}) => (
  <li className="flex ph3-ns pv2 pv3-ns items-center bt b--gray-300">
    <div className="w-25">{date}</div>
    <div className="w-20">{amount}</div>
    <div className="w-25">{plan}</div>
    <div className="w-30 tr">
      {cardBrand || echeck
        ? `${echeck ? 'Bank account' : cardBrand} ending in ${last4}`
        : 'No Charge'}
    </div>
  </li>
);

const EnhancedBillingPaymentListRow = Object.assign(
  React.memo(BillingPaymentListRow),
  {
    propTypes: {
      amount: PropTypes.string,
      cardBrand: PropTypes.string,
      date: PropTypes.string,
      plan: PropTypes.string,
      last4: PropTypes.string,
    },
  }
);

export default EnhancedBillingPaymentListRow;
