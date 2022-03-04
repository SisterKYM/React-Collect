import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useSuspenseQuery} from 'react-fetching-library';
import {get, keys} from 'lodash';

import config from 'config';
import {GET_PAYMENT_ACCOUNTS} from 'redux/modules/paymentAccounts/constants';
import {Elements} from 'elements/Stripe';
import {UserBasePage, Plate} from 'views/user/components';
import {getPaymentAccounts} from 'redux/modules/paymentAccounts/actions';
import {asyncConnect} from 'helpers';
import {createGetPaymentMethodsQuery} from 'queryCreators';
import useToggle from 'hooks/useToggle';

import {
  BankAccountFormContainer,
  BankAccountListContainer,
  CardAccountFormContainer,
  CardAccountListContainer,
} from './containers';
import {Section} from './components';

const PaymentMethodsPageContext = React.createContext();

const usePaymentMethodsPage = () => {
  const getPaymentMethodsQueryAction = React.useMemo(
    createGetPaymentMethodsQuery,
    []
  );
  const getPaymentMethodsQuery = useSuspenseQuery(getPaymentMethodsQueryAction);

  return {getPaymentMethodsQuery};
};

const PaymentMethodsPage = ({location}) => {
  const contextValue = usePaymentMethodsPage();
  const isUsd = useSelector(
    (state) => get(state.session, 'user.currency', 'usd') === 'usd'
  );
  const [bankAccountFormVisible, toggleBankAccountFormVisible] = useToggle();
  const [cardAccountFormVisible, toggleCardAccountFormVisible] = useToggle();

  const onDidSave = useCallback(() => {
    toggleCardAccountFormVisible.off();
    if (location.state?.from) {
      window.location = location.state.from;
    }
  }, [toggleCardAccountFormVisible, location.state]);

  return (
    <UserBasePage currentUrl={location.pathname} heading="Payment Methods">
      <PaymentMethodsPageContext.Provider value={contextValue}>
        <h2 className="mt3 f3">
          Pay {config.strings.collection}s faster by storing your payment
          methods
        </h2>
        <div className="mw6">
          <Section
            className="mt3"
            showForm={cardAccountFormVisible}
            heading="Credit and Debit Cards"
            actionText="Add Account"
            actionClb={toggleCardAccountFormVisible.on}
            form={
              <Plate onClose={toggleCardAccountFormVisible.off}>
                <Elements>
                  <CardAccountFormContainer onDidSave={onDidSave} />
                </Elements>
              </Plate>
            }
          >
            <CardAccountListContainer />
          </Section>
          {Boolean(isUsd) && (
            <Section
              className="mt5"
              heading="Bank Account"
              actionText="Add Account"
              showForm={bankAccountFormVisible}
              actionClb={toggleBankAccountFormVisible.on}
              form={
                <Plate onClose={toggleBankAccountFormVisible.off}>
                  <BankAccountFormContainer
                    onDidSave={toggleBankAccountFormVisible.off}
                  />
                </Plate>
              }
            >
              <BankAccountListContainer />
            </Section>
          )}
        </div>
      </PaymentMethodsPageContext.Provider>
    </UserBasePage>
  );
};

const enhance = asyncConnect((props) => {
  if (!props) {
    return [];
  }
  const state = props.store.getState();
  const paymentAccounts = get(state, 'paymentAccounts.paymentAccounts', {});
  const ks = keys(paymentAccounts);

  return ks.length !== 0
    ? []
    : [
        {
          key: GET_PAYMENT_ACCOUNTS,
          promise: getPaymentAccounts,
        },
      ];
});

const EnhancedPaymentMethodsPage = enhance(PaymentMethodsPage);

export {PaymentMethodsPageContext};
export default EnhancedPaymentMethodsPage;
