import {Field, Form} from 'formik';
import {Link} from 'react-router-dom';
import React from 'react';

import {FormikInput, Status, CommonButton} from 'elements';
import useToggle from 'hooks/useToggle';

import BankAccountButtonDropdown from './BankAccountButtonDropdown';
import SelectBankAccountList from './SelectBankAccountList';

const WithdrawForm = ({
  isSubmitting,
  addAccountVisible,
  bankAccounts,
  setFieldValue,
  submitForm,
}) => {
  const [dropdownVisible, toggleDropdownVisible] = useToggle();

  const handleChangeBankAccount = React.useCallback(
    bankAccount => {
      setFieldValue('stripe_bank_account_id', bankAccount.id, false);
      submitForm();
    },
    [setFieldValue, submitForm]
  );

  return (
    <Form className="mw7">
      <div className="flex flex-wrap">
        <div className="w-100 w-50-ns pr0 pr2-ns">
          <label
            className="avenir-roman gray-600 text-capitalize db mb1"
            style={{fontSize: '14px', lineHeight: '22px'}}
          >
            Amount to Withdraw
          </label>
          <Field
            name="amount"
            component={FormikInput}
            readOnly={isSubmitting}
            className="mb3 bn"
            placeholder="$"
          />
        </div>
        <div className="w-100 w-50-ns pl0 pl2-ns">
          <label
            className="avenir-roman gray-600 text-capitalize db mb1"
            style={{fontSize: '14px', lineHeight: '22px'}}
          >
            Statement Description
          </label>
          <Field
            component={FormikInput}
            readOnly={isSubmitting}
            className="mb3 bn"
            maxLength={17}
            name="statement_descriptor"
            placeholder="Up to 17 digits"
          />
        </div>
      </div>
      <div className="flex w-100 w-auto-ns items-center">
        <BankAccountButtonDropdown
          open={!isSubmitting && dropdownVisible}
          disabled={isSubmitting}
          dropdown={
            <div onClick={toggleDropdownVisible.off}>
              <SelectBankAccountList
                bankAccounts={bankAccounts}
                onChange={handleChangeBankAccount}
              />
              {addAccountVisible && (
                <div className="b--gray-300 bt" style={{padding: '20px 15px'}}>
                  <CommonButton className="pt-14 bg-gray-250">
                    <Link
                      className="gray-600"
                      to="/user/withdrawal-settings"
                      target="_blank"
                    >
                      Add an Account
                    </Link>
                  </CommonButton>
                </div>
              )}
            </div>
          }
          onClick={toggleDropdownVisible.on}
          onDismiss={toggleDropdownVisible.off}
        />
      </div>
      {isSubmitting && (
        <div className="mt3">
          <Status status="pending" />
        </div>
      )}
    </Form>
  );
};

const EnhancedWithdrawForm = React.memo(WithdrawForm);

export default EnhancedWithdrawForm;
