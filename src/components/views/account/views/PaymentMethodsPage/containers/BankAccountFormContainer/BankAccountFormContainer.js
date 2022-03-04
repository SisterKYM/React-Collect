import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import _ from 'lodash';

import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import PaymentMethodResource from 'resources/PaymentMethodResource';

import {BankAccountForm} from './components';

const BankAccountFormContainer = ({onDismiss}) => {
  const dispatch = useDispatch();
  const createPaymentMethod = useFetcher(PaymentMethodResource.createShape());
  const handleSubmit = useCallback(
    async (values) => {
      const payload = {
        account_holder_name: values.nickName || '',
        account_number: values.accountNumber,
        country: 'US',
        currency: 'USD',
        routing_number: values.routingNumber,
      };

      const stripeResponse = await window.StripeInstance.createToken(
        'bank_account',
        payload
      );

      if (stripeResponse.error) {
        dispatch(clearAlerts());
        dispatch(
          errorAlert({
            title: 'Error',
            body: stripeResponse.error.message,
          })
        );
      } else if (stripeResponse.token) {
        try {
          await createPaymentMethod(
            {},
            {
              nickname: values.name,
              source: _.get(stripeResponse, 'token.id', ''),
            }
          );
          dispatch(
            successAlert({
              title: 'Account Added',
              body: `${payload.account_holder_name} was added to your payment sources.`,
            })
          );
          onDismiss();
        } catch (error) {
          dispatch(clearAlerts());
          dispatch(
            errorAlert({
              title: 'Error',
              body: 'Something went wrong while saving your updates',
            })
          );
        }
      }
    },
    [createPaymentMethod, dispatch, onDismiss]
  );

  return <BankAccountForm onSubmit={handleSubmit} onCancel={onDismiss} />;
};

const EnhancedBankAccountFormContainer = React.memo(BankAccountFormContainer);

export default EnhancedBankAccountFormContainer;
