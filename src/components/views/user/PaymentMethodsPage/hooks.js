import {useDispatch} from 'react-redux';
import {useMutation} from 'react-fetching-library';
import _ from 'lodash';
import React from 'react';

import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import {createDeletePaymentMethodQuery} from 'queryCreators';

import {PaymentMethodsPageContext} from './PaymentMethodsPage';

const useHandleDeletePaymentMethod = () => {
  const {getPaymentMethodsQuery} = React.useContext(PaymentMethodsPageContext);
  const {mutate: deletePaymentMethod} = useMutation(
    createDeletePaymentMethodQuery
  );

  const dispatch = useDispatch();

  return React.useCallback(
    async bankAccount => {
      const {error, payload} = await deletePaymentMethod({
        paymentMethodId: bankAccount.id,
      });
      getPaymentMethodsQuery.query();

      if (error) {
        dispatch(clearAlerts());
        dispatch(
          errorAlert({
            body:
              payload.error ||
              _.get(payload, 'errors[0].details') ||
              'Something went wrong. Please try again',
            title: 'Payment method not deleted',
          })
        );
      }
    },
    [deletePaymentMethod, getPaymentMethodsQuery, dispatch]
  );
};

export {useHandleDeletePaymentMethod};
