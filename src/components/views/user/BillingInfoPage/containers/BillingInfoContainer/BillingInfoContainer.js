import {useSelector} from 'react-redux';
import React from 'react';
import BillingHelpers from 'helpers/BillingHelpers';

import {UPDATE_SUBSCRIPTION} from 'redux/modules/stripe/constants';

import {BillingInfo} from './components';
import {BillingInfoPageContext} from '../../BillingInfoPage';
import PaymentMethodFormContainer from './PaymentMethodFormContainer';

const BillingInfoContainer = ({className}) => {
  const pausedOrFreePlan = useSelector(
    state =>
      Boolean(state.session) &&
      (state.session.isPause || state.session.capabilities.plan === 'free')
  );
  const planName = useSelector(
    state => Boolean(state.session) && state.session.capabilities.plan
  );
  const updateSubscriptionStatus = useSelector(
    state => state.async.statuses[UPDATE_SUBSCRIPTION]
  );

  const {getSubscriptionInvoicesQuery} = React.useContext(
    BillingInfoPageContext
  );
  const {payload: billingHistory} = getSubscriptionInvoicesQuery;

  return (
    <BillingInfo
      className={className}
      echeck={
        billingHistory.payment_method &&
        !billingHistory.payment_method.exp_month
      }
      last4={
        billingHistory.payment_method ? billingHistory.payment_method.last4 : ''
      }
      plan={BillingHelpers.getFriendlyPlanName(planName)}
      showUpdate={pausedOrFreePlan}
      status={updateSubscriptionStatus}
      paymentMethodForm={<PaymentMethodFormContainer className="mt3" />}
    />
  );
};

export default BillingInfoContainer;
