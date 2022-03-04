import {compose} from 'recompose';
import {injectStripe} from 'react-stripe-elements';
import {reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Button, Status} from 'elements';
import {CardElement} from 'elements/Stripe';
import {AccountFormField} from 'views/user/components/forms';

const icons = ['Visa.svg', 'Amex.svg', 'Mastercard.svg', 'Discover.svg'];

const CardAccountForm = ({
  submitting,
  submitSucceeded,
  stripe,
  handleSubmit,
  onSubmit,
}) => {
  const cardCvcRef = React.useRef(null);
  const cardExpiryRef = React.useRef(null);
  const cardNumberRef = React.useRef(null);

  React.useEffect(() => {
    if (
      submitSucceeded &&
      cardCvcRef.current &&
      cardExpiryRef.current &&
      cardNumberRef.current
    ) {
      cardCvcRef.current.clear();
      cardExpiryRef.current.clear();
      cardNumberRef.current.clear();
    }
  }, [submitSucceeded]);

  const handleCardNumberElementReady = React.useCallback(ref => {
    cardNumberRef.current = ref;
  }, []);
  const handleCardExpiryElementReady = React.useCallback(ref => {
    cardExpiryRef.current = ref;
  }, []);
  const handleCardCvcElementReady = React.useCallback(ref => {
    cardCvcRef.current = ref;
  }, []);

  const handleSubmitForm = async values => {
    const res = await stripe.createToken();
    await onSubmit(values, res);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <AccountFormField first name="name" placeholder="Name on Card" />
      <CardElement
        className="mt3 br2"
        placeholder="Card Number"
        onReady={handleCardNumberElementReady}
      />
      <div className="flex flex-wrap justify-between">
        <div className="w-100 w-50-ns">
          <div className="mr2-ns">
            <CardElement
              className="mt3 br2"
              placeholder="MM/YY"
              type="expiry"
              onReady={handleCardExpiryElementReady}
            />
          </div>
        </div>
        <div className="w-100 w-50-ns">
          <div className="ml-ns">
            <CardElement
              className="mt3 br2"
              placeholder="CVC"
              type="cvc"
              onReady={handleCardCvcElementReady}
            />
          </div>
        </div>
      </div>
      <div className="flex-ns flex-row-reverse-ns justify-between-ns items-center-ns mt3">
        <div className="flex">
          {icons.map((icon, i) => (
            <img
              alt={icon}
              className={cx('db', i && 'ml3')}
              height={35}
              key={icon}
              src={require(`theme/images/${icon}`)} // eslint-disable-line import/no-dynamic-require
            />
          ))}
        </div>
        <div className="flex mt3 mt0-ns items-center">
          <Button small disabled={submitting}>
            Save
          </Button>
          {submitting && (
            <div className="ml2">
              <Status status="pending" />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

const enhance = compose(
  reduxForm({
    form: 'CardAccountForm',
    validate: ({name}) => {
      const err = {};
      const required = 'Required';
      if (!name) {
        err.name = required;
      }

      return err;
    },
  }),
  injectStripe
);

const EnhancedCardAccountForm = Object.assign(enhance(CardAccountForm), {
  propTypes: {
    onSubmit: PropTypes.func,
    status: PropTypes.string,
    updateStatus: PropTypes.func,
  },
});

export default EnhancedCardAccountForm;
