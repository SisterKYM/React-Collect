import {reset as resetForm} from 'redux-form';
import {useDispatch} from 'react-redux';
import {useMutation} from 'react-fetching-library';
import _ from 'lodash';
import React from 'react';

import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import {createPostPaymentMethodQuery} from 'queryCreators';

import {CardAccountForm} from './components';
import {PaymentMethodsPageContext} from '../../PaymentMethodsPage';

const useHandleSubmit = ({onDidSubmit}) => {
  const {getPaymentMethodsQuery} = React.useContext(PaymentMethodsPageContext);
  const {mutate: postPaymentMethod} = useMutation(createPostPaymentMethodQuery);

  const dispatch = useDispatch();

  return React.useCallback(
    async (values, stripeRes) => {
      const srk = Object.keys(stripeRes)[0];

      if (srk === 'error') {
        dispatch(clearAlerts());
        dispatch(
          errorAlert({
            body: _.get(stripeRes, 'error.message', ''),
            title: 'Card incomplete',
          })
        );
      } else if (srk === 'token') {
        const {error, payload} = await postPaymentMethod({
          body: {
            nickname: values.name,
            source: _.get(stripeRes, 'token.id', ''),
          },
        });

        if (error) {
          dispatch(
            errorAlert({
              title: 'Error',
              body:
                payload.error ||
                'Something went wrong while saving your updates',
            })
          );
        } else {
          dispatch(resetForm('CardAccountForm'));
          dispatch(
            successAlert({
              title: 'Card Added',
              body: 'Your card has been added to your payment sources.',
            })
          );

          getPaymentMethodsQuery.query();
          onDidSubmit();
        }
      }
    },
    [postPaymentMethod, getPaymentMethodsQuery, onDidSubmit, dispatch]
  );
};

const CardAccountFormContainer = ({onDidSave}) => {
  const handleSubmit = useHandleSubmit({onDidSubmit: onDidSave});

  return <CardAccountForm onSubmit={handleSubmit} />;
};

const EnhancedCardAccountFormContainer = React.memo(CardAccountFormContainer);

export default EnhancedCardAccountFormContainer;
