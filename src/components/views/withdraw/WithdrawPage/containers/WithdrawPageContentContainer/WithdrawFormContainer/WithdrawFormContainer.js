import * as Yup from 'yup';
import {FaExclamation} from 'react-icons/fa';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from 'react-fetching-library';
import React from 'react';

import {
  clearAlerts,
  errorAlert,
  successAlert,
} from 'redux/modules/growl/actions';
import {createPostWithdrawalQuery} from 'queryCreators';
import {currency} from 'helpers/numbers';

import {AmountValidationRequirements, WithdrawForm} from './components';
import {WithdrawPageContext} from '../../../WithdrawPage';
import {useBankAccounts, useCollections} from '../../../hooks';

const STATEMENT_DESCRIPTION_MAX_LENGTH = 22;

const ValidationSchema = Yup.object().shape({
  statement_description: Yup.string().max(
    STATEMENT_DESCRIPTION_MAX_LENGTH,
    `${STATEMENT_DESCRIPTION_MAX_LENGTH} character limit`
  ),
});

const useHandleSubmit = ({collectionId}) => {
  const {getCollectionsQuery} = React.useContext(WithdrawPageContext);
  const {mutate: postWithdrawal} = useMutation(createPostWithdrawalQuery);
  const dispatch = useDispatch();
  const collections = useCollections();

  return React.useCallback(
    async (values, formikBag) => {
      const collection = collections.filter(
        (collection) => collection.id === collectionId
      )[0];
      if (values.amount > collection.withdrawal_balance_available) {
        dispatch(
          errorAlert({
            title: 'Please fix the following errors:',
            icon: FaExclamation,
            body: 'Amount must be less than or equal to available amount',
          })
        );

        return;
      }

      const amountAsNumber = Number.parseFloat(values.amount);

      const invalid =
        values.amount.length === 0 ||
        Number.isNaN(amountAsNumber) ||
        amountAsNumber <= 0 ||
        values.amount.includes(',') ||
        values.amount.includes('$');

      dispatch(clearAlerts());

      if (invalid) {
        dispatch(
          errorAlert({
            title: 'Please fix the following errors:',
            icon: FaExclamation,
            body: <AmountValidationRequirements />,
          })
        );
      } else {
        const {error, payload: withdrawal} = await postWithdrawal({
          collectionId,
          body: values,
        });

        if (!error) {
          dispatch(
            successAlert({
              title: `Transfer of ${currency(withdrawal.amount)} initiated`,
              body:
                'Transfers are reviewed, which may delay deposit beyond the typical timeframe.',
              stay: true,
            })
          );

          formikBag.resetForm();

          getCollectionsQuery.query();
        }
      }

      formikBag.setSubmitting(false);
    },
    [collections, dispatch, collectionId, postWithdrawal, getCollectionsQuery]
  );
};

const WithdrawFormContainer = ({collection}) => {
  const bankAccounts = useBankAccounts();
  const handleSubmit = useHandleSubmit({collectionId: collection.id});
  const bankModificationsDisabled = useSelector(
    (state) => state.session.bankModificationsDisabled
  );

  const renderFormikContent = React.useCallback(
    (formikProps) => (
      <WithdrawForm
        isSubmitting={formikProps.isSubmitting}
        addAccountVisible={!bankModificationsDisabled}
        bankAccounts={bankAccounts}
        setFieldValue={formikProps.setFieldValue}
        submitForm={formikProps.submitForm}
      />
    ),
    [bankModificationsDisabled, bankAccounts]
  );

  const initialValues = React.useMemo(
    () => ({
      amount: '',
      statement_descriptor: '',
      stripe_bank_account_id: null,
    }),
    []
  );

  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {renderFormikContent}
    </Formik>
  );
};
const EnhancedWithdrawFormContainer = React.memo(WithdrawFormContainer);

export default EnhancedWithdrawFormContainer;
