import {Link} from 'react-router-dom';
import {useSuspenseQuery} from 'react-fetching-library';
import React from 'react';

import {Button} from 'elements';
import {UserBasePage} from 'views/user/components';
import {createGetSubscriptionInvoicesQuery} from 'queryCreators';

import {BillingInfoContainer, BillingPaymentListContainer} from './containers';

const BillingInfoPageContext = React.createContext();

const useBillingInfoPage = () => {
  const getSubscriptionInvoicesQueryAction = React.useMemo(
    createGetSubscriptionInvoicesQuery,
    []
  );
  const getSubscriptionInvoicesQuery = useSuspenseQuery(
    getSubscriptionInvoicesQueryAction
  );

  return {getSubscriptionInvoicesQuery};
};

const BillingInfoPage = ({location}) => {
  const contextValue = useBillingInfoPage();

  return (
    <UserBasePage currentUrl={location.pathname} heading="Billing Information">
      <BillingInfoPageContext.Provider value={contextValue}>
        <BillingInfoContainer className="mt3" />
        <Link to={`${location.pathname}/i/plans`}>
          <Button small backgroundColorSet className="mt4 gray-600 bg-gray-300">
            Manage Subscription
          </Button>
        </Link>
        <BillingPaymentListContainer className="mt4" />
      </BillingInfoPageContext.Provider>
    </UserBasePage>
  );
};

export {BillingInfoPageContext};
export default BillingInfoPage;
