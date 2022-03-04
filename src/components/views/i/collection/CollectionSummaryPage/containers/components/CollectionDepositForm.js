import {Field, reduxForm} from 'redux-form';
import React from 'react';

import {
  BankAccountFormSection,
  BankAccountSelectRow,
  SmallRoundCheckbox,
  CommonButton,
  Input,
  Status,
} from 'elements';

const CollectionDepositForm = ({
  className,
  loading,
  submitting,
  bankAccounts,
  handleSubmit,
  onSubmit,
}) => {
  const [useSavedBankAccount, setUseSavedBankAccount] = React.useState(
    bankAccounts.length !== 0
  );

  React.useEffect(() => {
    setUseSavedBankAccount(bankAccounts.length !== 0);
  }, [bankAccounts]);

  const toggleUseSavedBankAccount = React.useCallback(() => {
    setUseSavedBankAccount(prevUseSavedBankAccount => !prevUseSavedBankAccount);
  }, []);

  const renderBankAccountSelectRow = React.useCallback(
    bankAccount => (
      <BankAccountSelectRow
        key={bankAccount.id}
        bankAccount={bankAccount}
        selectControl={
          <Field
            type="radio"
            name="bankAccountId"
            value={bankAccount.id}
            component={SmallRoundCheckbox}
          />
        }
      />
    ),
    []
  );

  const handleSubmitForm = React.useCallback(
    ({bankAccountId, ...values}) => {
      onSubmit({
        ...values,
        bankAccountId: useSavedBankAccount ? bankAccountId : null,
      });
    },
    [onSubmit, useSavedBankAccount]
  );

  return (
    <form className={className} onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="mw5">
        <div className="mb2 text-14 avenir-roman dark-grey">
          Amount to add to this collection:
        </div>
        <Field
          component={Input}
          className="ph2 ba br2 text-14 no-outline"
          name="amount"
          style={{height: '34px'}}
          borderRadius={false}
          placeholder="$amount"
          pattern="[0-9]+([.][0-9]+)?"
        />
      </div>
      <div className="divider" />
      <div>
        <div className="mb3 text-14 avenir-roman dark-grey">
          Select Funding Source
        </div>
        <div className="w-50">
          {useSavedBankAccount ? (
            bankAccounts.map(x => renderBankAccountSelectRow(x))
          ) : (
            <BankAccountFormSection />
          )}
        </div>
      </div>
      {bankAccounts.length !== 0 && (
        <div
          className="mt3 f6 avenir-roman tint pointer"
          onClick={toggleUseSavedBankAccount}
        >
          Use {useSavedBankAccount ? 'New' : 'Saved'} Account
        </div>
      )}
      {submitting || loading ? (
        <Status className="w5 mt4" status="pending" />
      ) : (
        <CommonButton className="pt-14 mt4 bg-brand white" type="submit">
          Fund Collection
        </CommonButton>
      )}
      <style>{`
        .divider {
          border-bottom: 1px solid #E2E3E4;
          margin-top: 30px;
          margin-bottom: 40px;
        }
      `}</style>
    </form>
  );
};

const enhance = reduxForm({
  form: 'CollectionDepositForm',
  enableReinitialize: true,
  validate: values => {
    if (Number(values.amount) <= 0) {
      return {
        amount: 'Must be positive',
      };
    }

    return {
      amount: values.amount ? undefined : '*Required',
    };
  },
});

const EnhancedCollectionDepositForm = enhance(CollectionDepositForm);

export default EnhancedCollectionDepositForm;
