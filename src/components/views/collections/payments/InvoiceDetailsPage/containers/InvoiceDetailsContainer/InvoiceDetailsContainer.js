import React, {useMemo} from 'react';
import {useResource} from 'rest-hooks';

import {InvoiceDetails} from 'elements';
import RecurringPaymentContractResource from 'resources/RecurringPaymentContractResource';
import UserPaymentResource from 'resources/UserPaymentResource';

const InvoiceDetailsContainer = ({match}) => {
  const userPayments = useResource(UserPaymentResource.listShape(), {});
  const payment = useMemo(
    () =>
      userPayments.find(
        (userPayment) => userPayment.id === Number(match.params.payment)
      ),
    [match.params.payment, userPayments]
  );
  const {cards} = useResource(RecurringPaymentContractResource.listShape(), {});

  return <InvoiceDetails payment={payment} cards={cards} />;
};

const enhancedInvoiceDetailsContainer = React.memo(InvoiceDetailsContainer);

export default enhancedInvoiceDetailsContainer;
