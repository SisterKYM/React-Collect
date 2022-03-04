import React from 'react';

import {CardElement} from 'elements/Stripe';
import {Checkbox, InputLabel, TextInput} from 'elements';

const CreditCardForm = ({userLoggedIn, value, addPayment, onChangeValue}) => (
  <div className="cf">
    <TextInput
      required
      name="name"
      className="fl w-100 mb3"
      inputClassName="credit-card-input gray-600"
      label="Name on Card"
      placeholder="Name on Card"
      value={value.name}
      onChange={event => {
        onChangeValue({
          ...value,
          name: event.target.value,
        });
      }}
    />
    <InputLabel
      className="fl w-100 mb3"
      htmlFor="cardNumber"
      label="Card Number"
    >
      <CardElement
        border
        name="cardNumber"
        className="br2"
        placeholder="Card Number"
      />
    </InputLabel>
    <InputLabel
      className="fl w-30 w-third-ns pr1"
      htmlFor="expires"
      label="Expires"
    >
      <CardElement border name="expires" className="br2" type="expiry" />
    </InputLabel>
    <InputLabel
      className="fl w-30 w-third-ns ph1"
      htmlFor="securityCode"
      label="Security Code"
    >
      <CardElement border className="br2" name="securityCode" type="cvc" />
    </InputLabel>
    <TextInput
      required
      name="zip"
      className="fl w-40 w-third-ns pl1"
      inputClassName="credit-card-input gray-600"
      placeholder="Postal Code"
      label="Postal Code"
      type="zip"
      value={value.zip}
      onChange={event => {
        onChangeValue({
          ...value,
          zip: event.target.value,
        });
      }}
    />
    {userLoggedIn && !addPayment && (
      <div className="fl flex w-100 mt3 items-center">
        <Checkbox
          type="checkbox"
          name="saveSource"
          label="Save this card for future payments"
          checked={value.saveSource}
          onChange={() => {
            onChangeValue({
              ...value,
              saveSource: !value.saveSource,
            });
          }}
        />
      </div>
    )}
    <style jsx>{`
      :global(.credit-card-input) {
        padding-left: 0.5rem !important;
        padding-right: 0.5rem !important;
      }
    `}</style>
  </div>
);

const EnhancedCreditCardForm = React.memo(CreditCardForm);

export default EnhancedCreditCardForm;
