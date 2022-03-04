import {useSelector} from 'react-redux';
import moment from 'moment';
import React from 'react';

import {currency} from 'helpers/numbers';

import {BillingInfoPageContext} from '../../BillingInfoPage';
import {BillingPaymentListRow} from './components';

const usePayments = () => {
  const {getSubscriptionInvoicesQuery} = React.useContext(
    BillingInfoPageContext
  );
  const {payload} = getSubscriptionInvoicesQuery;

  return React.useMemo(
    () =>
      payload.billing_history.map(({charge, created, subscription}) => ({
        amount: currency(charge ? charge.amount / 100 : 0),
        echeck: charge && !charge.source.exp_month,
        cardBrand: charge ? charge.source.brand : 'Card',
        date: moment((created || 0) * 1000).format('MM/DD/YYYY'),
        plan: subscription.plan.name,
        last4: charge ? charge.source.last4 : '****',
      })),
    [payload]
  );
};

const BillingPaymentListContainer = ({className}) => {
  const browser = useSelector(state => state.browser);
  const payments = usePayments();

  return (
    <ul className={className}>
      {payments.map((payment, idx) => (
        <BillingPaymentListRow browser={browser} key={idx} {...payment} />
      ))}
    </ul>
  );
};

const EnhancedBillingPaymentListContainer = React.memo(
  BillingPaymentListContainer
);

export default EnhancedBillingPaymentListContainer;
