import React, {useMemo} from 'react';
import {useResource} from 'rest-hooks';

import {InvoiceDetails} from 'elements';
import CollectionPaymentResource from 'resources/CollectionPaymentResource';

const PaymentDetailsContainer = ({match}) => {
  const collectionId = Number(match.params.collection);
  const paymentId = Number(match.params.payment);

  const {data: payments} = useResource(CollectionPaymentResource.listShape(), {
    collectionId,
  });

  const payment = useMemo(
    () => payments.find((payment) => payment.id === paymentId),
    [paymentId, payments]
  );

  return <InvoiceDetails payment={payment} />;
};

const enhancedPaymentDetailsContainer = React.memo(PaymentDetailsContainer);

export default enhancedPaymentDetailsContainer;
