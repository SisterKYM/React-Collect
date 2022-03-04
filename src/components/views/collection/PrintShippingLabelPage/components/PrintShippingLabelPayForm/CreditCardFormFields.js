import {Field} from 'formik';
import React from 'react';

import {CardElement} from 'elements/Stripe';
import {FormikInput} from 'elements';

const CreditCardFormFields = ({className, errors}) => (
  <div className={className}>
    <div className="mb3">
      <div className="mb2 f6">Name on Card</div>
      <Field name="creditCard.name">
        {({field, form}) => (
          <FormikInput
            border
            borderRadius={false}
            placeholder="Name on Card"
            field={field}
            form={form}
            errors={errors}
          />
        )}
      </Field>
    </div>
    <div className="mb3">
      <div className="mb2 f6">Card Number</div>
      <CardElement border placeholder="Card Number" height={34} />
    </div>
    <div className="flex mb3">
      <div className="w-third pr2">
        <div className="mb2 f6">Expires</div>
        <CardElement border type="expiry" height={34} />
      </div>
      <div className="w-third pr2">
        <div className="mb2 f6 nowrap">Security Code</div>
        <CardElement border type="cvc" height={34} />
      </div>
      <div className="w-third">
        <div className="mb2 f6 nowrap">Zip Code</div>
        <CardElement border type="zip" placeholder="12345" height={34} />
      </div>
    </div>
  </div>
);

const EnhancedCreditCardFormFields = React.memo(CreditCardFormFields);

export default EnhancedCreditCardFormFields;
