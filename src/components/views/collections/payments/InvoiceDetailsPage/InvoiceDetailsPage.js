import React from 'react';

import {InvoiceDetailsContainer} from './containers';

const InvoiceDetailsPage = ({match}) => (
  <InvoiceDetailsContainer match={match} />
);

const EnhancedInvoiceDetailsPage = React.memo(InvoiceDetailsPage);

export default EnhancedInvoiceDetailsPage;
