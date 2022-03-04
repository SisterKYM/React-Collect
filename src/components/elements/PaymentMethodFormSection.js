import {Field} from 'redux-form';
import React from 'react';

import BankAccountFormSection from 'elements/BankAccountFormSection';
import BankAccountSelectRow from 'elements/BankAccountSelectRow';
import BigCheckbox from 'elements/BigCheckbox';
import Button from 'elements/Button';
import CreditCardFormSection from 'elements/CreditCardFormSection';
import CreditCardSelectRow from 'elements/CreditCardSelectRow';
import Status from 'elements/Status';

const renderCreditCardSelectRow = (creditCard) => (
  <CreditCardSelectRow
    key={creditCard.id}
    className="mb3"
    creditCard={creditCard}
    selectControl={
      <Field
        name="creditCardId"
        type="radio"
        value={creditCard.id}
        component={BigCheckbox}
      />
    }
  />
);

const renderBankAccountSelectRow = (bankAccount) => (
  <BankAccountSelectRow
    key={bankAccount.id}
    bankAccount={bankAccount}
    selectControl={
      <Field
        type="radio"
        name="bankAccountId"
        value={bankAccount.id}
        component={BigCheckbox}
      />
    }
  />
);

const renderNewMethodField = ({input, onLabel, offLabel}) => {
  const handleClick = () => {
    input.onChange(!input.value);
  };

  return (
    <div className="mb3 f7 tint pointer" onClick={handleClick}>
      {input.value ? onLabel : offLabel}
    </div>
  );
};

const PaymentMethodFormSection = ({
  className,
  loading,
  method,
  newMethod,
  creditCards,
  bankAccounts,
}) => (
  <div className={className}>
    <div className="flex flex-wrap">
      <div className="w-100 w-50-ns pa2 gray-600">
        <div className="mb4 text-18 avenir-roman">Payment Method</div>
        <Field
          className="mb3"
          type="radio"
          name="method"
          label="Credit Card"
          value="card"
          labelClassName="text-16"
          size={22}
          component={BigCheckbox}
        />
        <Field
          className="mb3"
          type="radio"
          name="method"
          label="eCheck"
          value="echeck"
          labelClassName="text-16"
          size={22}
          component={BigCheckbox}
        />
      </div>
      <div className="w-100 w-50-ns pa2 gray-600">
        {method === 'card' ? (
          <>
            {newMethod ? (
              <CreditCardFormSection nameFieldHidden zipFieldHidden />
            ) : (
              creditCards.map((x) => renderCreditCardSelectRow(x))
            )}
            {creditCards.length !== 0 && (
              <Field
                name="newMethod"
                component={renderNewMethodField}
                onLabel="Use Saved Card"
                offLabel="Use New Card"
              />
            )}
          </>
        ) : (
          <>
            {bankAccounts.length === 0 || newMethod ? (
              <BankAccountFormSection />
            ) : (
              bankAccounts.map((x) => renderBankAccountSelectRow(x))
            )}
            {bankAccounts.length !== 0 && (
              <Field
                name="newMethod"
                component={renderNewMethodField}
                onLabel="Use Saved Account"
                offLabel="Use New Account"
              />
            )}
          </>
        )}
        {loading ? (
          <Status status="pending" />
        ) : (
          <Button
            backgroundColorSet
            fontFamilySet
            className="text-16 avenir-roman w-100 bg-brand"
          >
            Save
          </Button>
        )}
      </div>
    </div>
  </div>
);

const EnhancedPaymentMethodFormSection = React.memo(PaymentMethodFormSection);

export default EnhancedPaymentMethodFormSection;
