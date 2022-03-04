import {Field, formValueSelector, reduxForm} from 'redux-form';
import {compose} from 'recompose';
import {injectStripe} from 'react-stripe-elements';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import PaymentMethodFormSection from './PaymentMethodFormSection';
import SubscriptionPlanField from './SubscriptionPlanField';

const FORM_NAME = 'UpgradePlanForm';

const formValueSelect = formValueSelector(FORM_NAME);

const UpgradePlanForm = ({
  loading,
  creditCards,
  bankAccounts,
  stripe,
  fieldPanels,
  handleSubmit,
  onSubmit,
}) => {
  const method = useSelector((state) => formValueSelect(state, 'method'));
  const newMethod = useSelector((state) => formValueSelect(state, 'newMethod'));
  const [plan, setPlan] = React.useState('');

  const onPlanUpdate = (value) => {
    setPlan(fieldPanels.find((panel) => panel.value === value));
  };

  const handleSubmitForm = React.useCallback(
    (values) => {
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
        coupon: values.coupon,
      });
    },
    [onSubmit, stripe]
  );

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="mb4">
        <Field
          name="plan"
          disabled={loading}
          fieldPanels={fieldPanels}
          onChange={onPlanUpdate}
          component={SubscriptionPlanField}
        />
      </div>
      <PaymentMethodFormSection
        className="w-100 w-two-thirds-l pa3 bg-white br2"
        loading={loading}
        method={method}
        newMethod={newMethod}
        creditCards={creditCards}
        bankAccounts={bankAccounts}
        plan={plan}
      />
    </form>
  );
};

UpgradePlanForm.propTypes = {
  loading: PropTypes.bool,
  fieldPanels: PropTypes.array,
  onSubmit: PropTypes.func,
};

const enhance = compose(injectStripe, reduxForm({form: FORM_NAME}));

const EnhancedUpgradePlanForm = Object.assign(enhance(UpgradePlanForm), {
  formName: FORM_NAME,
});

export default EnhancedUpgradePlanForm;
