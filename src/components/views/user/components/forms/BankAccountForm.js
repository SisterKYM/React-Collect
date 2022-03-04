import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, Status} from 'elements';
import ECheckAccountNumberHelpImage from 'theme/images/ECheckAccountNumberHelp.jpg';
import ECheckRoutingNumberHelpImage from 'theme/images/ECheckRoutingNumberHelp.jpg';

import AccountFormField from './AccountFormField';

const displayName = 'views/user/components/forms/BankAccountForm';

const BankAccountForm = ({handleSubmit, invalid, onSubmit, status}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <AccountFormField
      first
      helpUrl={ECheckRoutingNumberHelpImage}
      name="routingNumber"
      placeholder="Routing Number"
    />
    <AccountFormField
      helpUrl={ECheckAccountNumberHelpImage}
      name="accountNumber"
      placeholder="Account Number"
    />
    <AccountFormField name="nickName" placeholder="Nickname" />
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
  validate: ({accountNumber, nickName, routingNumber}) => {
    const err = {};
    if (!routingNumber) {
      err.routingNumber = 'Required';
    }
    if (!accountNumber) {
      err.accountNumber = 'Required';
    }
    if (!nickName) {
      err.nickName = 'Required';
    }

    return err;
  },
});

const EnhancedBankAccountForm = Object.assign(enhance(BankAccountForm), {
  propTypes: {
    onSubmit: PropTypes.func,
    status: PropTypes.string,
  },
});

export {displayName};
export default EnhancedBankAccountForm;
