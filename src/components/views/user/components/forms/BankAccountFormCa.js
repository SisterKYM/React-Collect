import {reduxForm, Field} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, Status, Input} from 'elements';
import {formErrors} from 'theme/constants';
import AccountNumberCanImage from 'theme/images/AccountNumberCan.png';
import InstitutionNumberCanImage from 'theme/images/InstitutionNumberCan.png';
import TransitNumberCanImage from 'theme/images/TransitNumberCan.png';

import AccountFormField from './AccountFormField';

const displayName = 'BankAccountFormCa';

const BankAccountFormCa = ({handleSubmit, onSubmit, invalid, status}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <AccountFormField
      first
      helpUrl={TransitNumberCanImage}
      name="transitNumber"
      placeholder="Transit Number"
    />
    <AccountFormField
      helpUrl={InstitutionNumberCanImage}
      name="institutionNumber"
      placeholder="Institution Number"
    />
    <AccountFormField
      helpUrl={AccountNumberCanImage}
      name="accountNumber"
      placeholder="Account Number"
    />
    <div className="mt3">
      <Field component={Input} name="nickName" placeholder="Nickname" />
    </div>
    <div className="flex mt4 items-center">
      <Button small disabled={invalid || status === 'pending'}>
        Save
      </Button>
      {status === 'pending' && (
        <div className="ml3">
          <Status status="pending" />
        </div>
      )}
    </div>
  </form>
);

const enhance = reduxForm({
  form: displayName,
  validate: (values = {}) => {
    const errs = {};
    if (!values.transitNumber) {
      errs.transitNumber = formErrors.REQUIRED;
    }
    if (!values.institutionNumber) {
      errs.institutionNumber = formErrors.REQUIRED;
    }
    if (!values.accountNumber) {
      errs.accountNumber = formErrors.REQUIRED;
    }
    if (!values.nickName) {
      errs.nickName = formErrors.REQUIRED;
    }

    return errs;
  },
});

const EnhancedBankAccountFormCa = Object.assign(enhance(BankAccountFormCa), {
  propTypes: {
    onSubmit: PropTypes.func,
  },
});

export {displayName};
export default EnhancedBankAccountFormCa;
