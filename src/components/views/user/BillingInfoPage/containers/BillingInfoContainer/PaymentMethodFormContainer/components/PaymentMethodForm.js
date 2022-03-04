import {compose} from 'recompose';
import {connect} from 'react-redux';
import {formValueSelector, reduxForm} from 'redux-form';
import {injectStripe} from 'react-stripe-elements';
import PropTypes from 'prop-types';
import React from 'react';

import {PaymentMethodFormSection} from 'elements';

const FORM_NAME = 'PaymentMethodForm';

const PaymentMethodForm = ({
  loading,
  method,
  newMethod,
  creditCards,
  bankAccounts,
  stripe,
  handleSubmit,
  onSubmit,
}) => {
  const handleSubmitForm = React.useCallback(
    values => {
      const getPaymentMethodId = () => {
        if (values.newMethod) {
          return null;
        }

        return values.method === 'card'
          ? values.creditCardId
          : values.bankAccountId;
      };

      onSubmit({
        createToken: async () => {
          if (values.method === 'card') {
            return stripe.createToken();
          }

          return stripe.createToken('bank_account', {
            country: 'US',
            currency: 'USD',
            account_number: values.accountNumber,
            routing_number: values.routingNumber,
          });
        },
        paymentMethodId: getPaymentMethodId(),
        plan: values.plan,
      });
    },
    [onSubmit, stripe]
  );

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <PaymentMethodFormSection
        loading={loading}
        method={method}
        newMethod={newMethod}
        creditCards={creditCards}
        bankAccounts={bankAccounts}
      />
    </form>
  );
};

PaymentMethodForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

const formValueSelect = formValueSelector(FORM_NAME);

const enhance = compose(
  injectStripe,
  reduxForm({form: FORM_NAME}),
  connect(state => ({
    method: formValueSelect(state, 'method'),
    newMethod: formValueSelect(state, 'newMethod'),
  }))
);

const EnhancedPaymentMethodForm = enhance(PaymentMethodForm);

export default EnhancedPaymentMethodForm;
