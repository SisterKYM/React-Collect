import {reset as resetForm} from 'redux-form';
import {useDispatch} from 'react-redux';
import {useMutation} from 'react-fetching-library';
import _ from 'lodash';
import React from 'react';

import {BankAccountForm} from 'views/user/components/forms';
import {displayName as bankAccountFormName} from 'views/user/components/forms/BankAccountForm';

import {errorAlert, successAlert} from 'redux/modules/growl/actions';
import {createPostPaymentMethodQuery} from 'queryCreators';
import {promiseStripeToken} from 'redux/modules/stripe/helpers';

import {PaymentMethodsPageContext} from '../PaymentMethodsPage';

const useHandleSubmit = ({onDidSubmit}) => {
  const {getPaymentMethodsQuery} = React.useContext(PaymentMethodsPageContext);
  const {mutate: postPaymentMethod} = useMutation(createPostPaymentMethodQuery);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    async values => {
      const payload = {
        account_holder_name: values.nickName || '',
        account_number: values.accountNumber,
        country: 'US',
        currency: 'USD',
        routing_number: values.routingNumber,
      };

      setLoading(true);

      const stripeRes = await promiseStripeToken(payload, 'bank_account');

      if (stripeRes.error) {
        setLoading(false);

        dispatch(
          errorAlert({
            title: 'Error',
            body: stripeRes.error.message,
          })
        );
      } else if (stripeRes.token) {
        const {
          error,
          payload: postPaymentMethodPayload,
        } = await postPaymentMethod({
          body: {
            nickname: payload.name,
            source: _.get(stripeRes, 'token.id', ''),
          },
        });

        setLoading(false);

        if (error) {
          dispatch(
            errorAlert({
              title: 'Error',
              body:
                postPaymentMethodPayload.error ||
                'Something went wrong while saving your updates',
            })
          );
        } else {
          onDidSubmit();

          dispatch(resetForm(bankAccountFormName));
          dispatch(
            successAlert({
              title: 'Account Added',
              body: `${payload.account_holder_name} was added to your payment sources.`,
            })
          );

          getPaymentMethodsQuery.query();
        }
      }
    },
    [postPaymentMethod, getPaymentMethodsQuery, onDidSubmit, dispatch]
  );

  return {loading, handleSubmit};
};

const BankAccountFormContainer = ({onDidSave}) => {
  const {loading, handleSubmit} = useHandleSubmit({onDidSubmit: onDidSave});

  return (
    <BankAccountForm
      status={loading ? 'pending' : undefined}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedBankAccountFormContainer = React.memo(BankAccountFormContainer);

export default EnhancedBankAccountFormContainer;
