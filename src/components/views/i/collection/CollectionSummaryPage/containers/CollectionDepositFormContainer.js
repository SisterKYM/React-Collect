import {compose} from 'recompose';
import {connect, useDispatch} from 'react-redux';
import {injectStripe} from 'react-stripe-elements';
import React from 'react';
import shortid from 'shortid';

import {CREATE_COLLECTION_DEPOSIT} from 'redux/modules/collectionDeposits/constants';
import {GET_PAYMENT_ACCOUNTS} from 'redux/modules/paymentAccounts/constants';
import {asyncConnect} from 'helpers';
import {createCollectionDeposit} from 'redux/modules/collectionDeposits/actions';
import {getPaymentAccounts} from 'redux/modules/paymentAccounts/actions';

import {successAlert} from 'redux/modules/growl/actions';
import {CollectionDepositForm} from './components';

const CENTS_IN_USD = 100;

const CollectionDepositFormContainer = ({
  className,
  tabId,
  bankAccounts,
  createCollectionDepositStatus,
  onCreateCollectionDeposit,
  onDidCreateCollectionDeposit,
}) => {
  React.useEffect(() => {
    if (createCollectionDepositStatus === 'success') {
      onDidCreateCollectionDeposit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCollectionDepositStatus]);

  const idempotencyKey = React.useMemo(() => shortid.generate(), []);

  const dispatch = useDispatch();

  const handleSubmit = React.useCallback(
    async ({amount, bankAccountId, accountNumber, routingNumber}) => {
      onCreateCollectionDeposit({
        tabId,
        bankAccountId,
        accountNumber,
        routingNumber,
        amount_cents: Number(amount) * CENTS_IN_USD,
        idempotency_key: idempotencyKey,
      });

      dispatch(
        successAlert({
          title: 'You’ve initiated a deposit',
          body: 'A confirmation has been emailed',
          stay: true,
        })
      );
    },
    [dispatch, idempotencyKey, onCreateCollectionDeposit, tabId]
  );

  const initialValues = React.useMemo(
    () => ({
      bankAccountId: bankAccounts.length !== 0 ? bankAccounts[0].id : null,
    }),
    [bankAccounts]
  );

  return (
    <CollectionDepositForm
      className={className}
      loading={createCollectionDepositStatus === 'pending'}
      initialValues={initialValues}
      bankAccounts={bankAccounts}
      onSubmit={handleSubmit}
    />
  );
};

const enhance = compose(
  injectStripe,
  asyncConnect(() => [
    {
      key: GET_PAYMENT_ACCOUNTS,
      promise: getPaymentAccounts,
    },
  ]),
  connect(
    (state) => ({
      bankAccounts:
        (state.paymentAccounts &&
          state.paymentAccounts.paymentAccounts &&
          state.paymentAccounts.paymentAccounts.banks) ||
        [],
      createCollectionDepositStatus:
        state.async.statuses[CREATE_COLLECTION_DEPOSIT],
    }),
    (dispatch) => ({
      onCreateCollectionDeposit: (payload) =>
        dispatch(createCollectionDeposit(payload)),
    })
  )
);

const EnhancedCollectionDepositFormContainer = enhance(
  CollectionDepositFormContainer
);

export default EnhancedCollectionDepositFormContainer;
