import React from 'react';

import {UserBasePage} from 'views/user/components';

import {RecurringPaymentContractListContainer} from './containers';

const RecurringPaymentsPage = ({location}) => (
  <UserBasePage currentUrl={location.pathname} heading="Recurring Payments">
    <RecurringPaymentContractListContainer />
  </UserBasePage>
);

const EnhancedRecurringPaymentsPage = React.memo(RecurringPaymentsPage);

export default EnhancedRecurringPaymentsPage;
