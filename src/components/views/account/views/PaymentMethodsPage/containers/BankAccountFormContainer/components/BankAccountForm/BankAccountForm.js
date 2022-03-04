import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

import {CommonButton} from 'elements';
import ECheckAccountNumberHelpImage from 'theme/images/ECheckAccountNumberHelp.jpg';
import ECheckRoutingNumberHelpImage from 'theme/images/ECheckRoutingNumberHelp.jpg';

import {AccountFormField} from './components';

const initialValues = {
  nickName: '',
  routingNumber: '',
  accountNumber: '',
};

const validationSchema = Yup.object().shape({
  nickName: Yup.string().required('Required'),
  routingNumber: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
});

const BankAccountForm = ({onSubmit, onCancel}) => {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({isSubmitting}) => (
        <Form>
          <div className="mb3">
            <label htmlFor="nickName" className="db mb1 text-14">
              Account Nickname
            </label>
            <AccountFormField
              label="Account Nickname"
              name="nickName"
              placeholder="Nickname"
            />
          </div>
          <div className="mb3">
            <label htmlFor="routingNumber" className="db mb1 text-14">
              Routing Number
            </label>
            <AccountFormField
              className="mb3"
              label="Routing Number"
              helpUrl={ECheckRoutingNumberHelpImage}
              name="routingNumber"
              placeholder="Routing Number"
            />
          </div>
          <div className="mb3">
            <label htmlFor="accountNumber" className="db mb1 text-14">
              Account Number
            </label>
            <AccountFormField
              label="Account Number"
              helpUrl={ECheckAccountNumberHelpImage}
              name="accountNumber"
              placeholder="Account Number"
            />
          </div>
          <div className="flex mt3-5 items-center">
            <CommonButton
              className="bg-tint mr4 pt-16 white w-50"
              disabled={isSubmitting}
              type="submit"
            >
              Save
            </CommonButton>
            <div className="text-16 tint pointer" onClick={onCancel}>
              Cancel
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const EnhancedBankAccountForm = React.memo(BankAccountForm);

export default EnhancedBankAccountForm;
