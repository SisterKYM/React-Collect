import {Field} from 'redux-form';
import {Element as ScrollAnchor} from 'react-scroll';
import React from 'react';
import cx from 'classnames';

import {CardElement} from 'elements/Stripe';
import Input from 'elements/Input';

const CreditCardFormSection = ({
  className,
  nameFieldHidden = false,
  zipFieldHidden = false,
  scrollAnchorPrefix,
  normalizeName,
}) => (
  <div className={className}>
    {!nameFieldHidden && (
      <div className="mb3">
        <div className="mb2 f6">Name on Card</div>
        {scrollAnchorPrefix && (
          <ScrollAnchor name={`${scrollAnchorPrefix}-name`} />
        )}
        <Field
          border
          borderRadius={false}
          component={Input}
          name="name"
          normalize={normalizeName}
          placeholder="Name on Card"
        />
      </div>
    )}
    <div className="mb3">
      <div className="mb2 f6">Card Number</div>
      {scrollAnchorPrefix && (
        <ScrollAnchor name={`${scrollAnchorPrefix}-number`} />
      )}
      <CardElement border placeholder="Card Number" />
    </div>
    <div className="flex mb3">
      <div className={cx('pr2', zipFieldHidden ? 'w-50' : 'w-third')}>
        <div className="mb2 f6">Expires</div>
        {scrollAnchorPrefix && (
          <ScrollAnchor name={`${scrollAnchorPrefix}-expMonthYear`} />
        )}
        <CardElement border type="expiry" />
      </div>
      <div className={cx('pr2', zipFieldHidden ? 'w-50' : 'w-third')}>
        <div className="mb2 f6 nowrap">Security Code</div>
        {scrollAnchorPrefix && (
          <ScrollAnchor name={`${scrollAnchorPrefix}-cvc`} />
        )}
        <CardElement border type="cvc" />
      </div>
      {!zipFieldHidden && (
        <div className="w-third">
          <div className="mb2 f6 nowrap">Zip Code</div>
          <ScrollAnchor name={`${scrollAnchorPrefix}-zip`} />
          <CardElement elementClassName="ba" type="zip" placeholder="12345" />
        </div>
      )}
    </div>
  </div>
);

const EnhancedCreditCardFormSection = React.memo(CreditCardFormSection);

export default EnhancedCreditCardFormSection;
