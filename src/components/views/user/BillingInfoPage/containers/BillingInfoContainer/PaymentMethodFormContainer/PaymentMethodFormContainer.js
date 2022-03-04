import {change} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from 'react-fetching-library';
import React from 'react';

import {createGetPaymentMethodsQuery} from 'queryCreators';
import {Elements} from 'elements/Stripe';
import {UPDATE_SUBSCRIPTION} from 'redux/modules/stripe/constants';
import {updateSubscription} from 'redux/modules/stripe/actions';

import {BillingInfoPageContext} from '../../../BillingInfoPage';
import {PaymentMethodForm} from './components';

const PaymentMethodFormContainer = ({className}) => {
  const {getSubscriptionInvoicesQuery} = React.useContext(
    BillingInfoPageContext
  );

  const dispatch = useDispatch();

  const updateSubscriptionStatus = useSelector(
    (state) => state.async.statuses[UPDATE_SUBSCRIPTION]
  );

  React.useEffect(() => {
    if (updateSubscriptionStatus === 'success') {
      getSubscriptionInvoicesQuery.query();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSubscriptionStatus]);

  const getPaymentMethodsQueryAction = React.useMemo(
    createGetPaymentMethodsQuery,
    []
  );
  const {payload: paymentMethods} = useQuery(getPaymentMethodsQueryAction);
  const {creditCards = [], bankAccounts = []} = paymentMethods || {};

  const paymentMethoFormInitialValues = React.useMemo(
    () => ({
      creditCardId: creditCards.length === 0 ? null : creditCards[0].id,
      bankAccountId: bankAccounts.length === 0 ? null : bankAccounts[0].id,
      newMethod: creditCards.length === 0,
      method: 'card',
    }),
    [creditCards, bankAccounts]
  );

  const handleSubmit = React.useCallback(
    ({createToken, paymentMethodId}) => {
      dispatch(
        updateSubscription({
          plan: 'no_change',
          createToken,
          paymentMethodId,
        })
      );
    },
    [dispatch]
  );

  const handleChangePaymentMethodFormValues = React.useCallback(
    (values, dispatch) => {
      if (
        bankAccounts.length === 0 &&
        !values.newMethod &&
        values.method === 'echeck'
      ) {
        dispatch(change('PaymentMethodForm', 'newMethod', true));
      }
    },
    [bankAccounts.length]
  );

  return (
    <div className={className}>
      <Elements>
        <PaymentMethodForm
          enableReinitialize
          initialValues={paymentMethoFormInitialValues}
          creditCards={creditCards}
          bankAccounts={bankAccounts}
          loading={updateSubscriptionStatus === 'pending'}
          onChange={handleChangePaymentMethodFormValues}
          onSubmit={handleSubmit}
        />
      </Elements>
    </div>
  );
};

const EnhancedPaymentMethodFormContainer = React.memo(
  PaymentMethodFormContainer
);

export default EnhancedPaymentMethodFormContainer;
