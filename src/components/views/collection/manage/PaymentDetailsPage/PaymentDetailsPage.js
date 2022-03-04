import React from 'react';

import {PaymentDetailsContainer} from './containers';

const PaymentDetailsPage = ({match}) => (
  <PaymentDetailsContainer match={match} />
);

const enhancedPaymentDetailsPage = React.memo(PaymentDetailsPage);

export default enhancedPaymentDetailsPage;
