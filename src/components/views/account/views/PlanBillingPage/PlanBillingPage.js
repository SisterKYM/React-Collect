import React from 'react';
import {useResource} from 'rest-hooks';

import SubscriptionInvoiceResource from 'resources/SubscriptionInvoiceResource';
import RecurringPaymentContractResource from 'resources/RecurringPaymentContractResource';

import {PlanMethod, PaymentMethods, BillingPaymentList} from './components';

const PlanBillingPage = ({location}) => {
  const {plan, billing_history: BillingHistory} = useResource(
    SubscriptionInvoiceResource.listShape(),
    {}
  );

  const {cards: paymentMethods} = useResource(
    RecurringPaymentContractResource.listShape(),
    {}
  );

  return (
    <>
      <h1 className="avenir-roman dark-grey mb2 tc text-32">
        Plan and Billing
      </h1>
      <PlanMethod plan={plan} location={location} />
      <PaymentMethods paymentMethods={paymentMethods} />
      <hr className="mt3-5 mb3-5" />
      <BillingPaymentList BillingHistory={BillingHistory} />
    </>
  );
};

const EnhancedPlanBillingPage = React.memo(PlanBillingPage);

export default EnhancedPlanBillingPage;
