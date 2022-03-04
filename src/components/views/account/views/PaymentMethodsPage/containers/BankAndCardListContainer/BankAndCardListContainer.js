import React, {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useFetcher, useResource} from 'rest-hooks';
import _ from 'lodash';

import {clearAlerts, errorAlert} from 'redux/modules/growl/actions';
import PaymentMethodResource from 'resources/PaymentMethodResource';

import {BankItem, CardItem} from './components';

const BankAndCardListContainer = () => {
  const paymentMethods = useResource(PaymentMethodResource.listShape(), {});
  const banks = useMemo(
    () =>
      (paymentMethods || []).filter(({routing_number}) =>
        Boolean(routing_number)
      ),
    [paymentMethods]
  );
  const cards = useMemo(
    () => (paymentMethods || []).filter(({routing_number}) => !routing_number),
    [paymentMethods]
  );

  const deletePaymentMethod = useFetcher(PaymentMethodResource.deleteShape());
  const dispatch = useDispatch();
  const handleDeletePaymentMethod = useCallback(
    async (paymentMethod) => {
      try {
        await deletePaymentMethod(paymentMethod, {});
      } catch (error) {
        dispatch(clearAlerts());
        dispatch(
          errorAlert({
            body: 'Something went wrong. Please try again',
            title: 'Payment method not deleted',
          })
        );
      }
    },
    [deletePaymentMethod, dispatch]
  );

  return (
    <>
      {banks && banks.length > 0 && (
        <>
          <label className="text-14 avenir-roman db mb2-5">
            My Bank Account(s)
          </label>
          {banks.map((bank) => (
            <BankItem
              key={bank.id}
              bank={bank}
              onDelete={handleDeletePaymentMethod}
            />
          ))}
        </>
      )}
      {cards && cards.length > 0 && (
        <>
          <label className="text-14 avenir-roman db mb2-5">
            My Credit and Debit Card(s)
          </label>
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onDelete={handleDeletePaymentMethod}
            />
          ))}
        </>
      )}
    </>
  );
};

const EnhancedBankAndCardListContainer = React.memo(BankAndCardListContainer);

export default EnhancedBankAndCardListContainer;
