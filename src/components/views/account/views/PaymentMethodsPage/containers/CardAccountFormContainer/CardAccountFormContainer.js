import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import _ from 'lodash';

import {Elements} from 'elements/Stripe';
import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import PaymentMethodResource from 'resources/PaymentMethodResource';

import {CardAccountForm} from './components';
import {StripeHookProvider} from './providers';

const CardAccountFormContainer = ({onDismiss}) => {
  const dispatch = useDispatch();
  const createPaymentMethod = useFetcher(PaymentMethodResource.createShape());
  const handleSubmit = useCallback(
    async (values, stripeResponse) => {
      const srk = Object.keys(stripeResponse)[0];

      if (srk === 'error') {
        dispatch(clearAlerts());
        dispatch(
          errorAlert({
            body: _.get(stripeResponse, 'error.message', ''),
            title: 'Card incomplete',
          })
        );
      } else if (srk === 'token') {
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
              title: 'Card Added',
              body: 'Your card has been added to your payment sources.',
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

  return (
    <Elements>
      <StripeHookProvider>
        <CardAccountForm onSubmit={handleSubmit} onCancel={onDismiss} />
      </StripeHookProvider>
    </Elements>
  );
};

const EnhancedCardAccountFormContainer = React.memo(CardAccountFormContainer);

export default EnhancedCardAccountFormContainer;
