import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import React from 'react';

import {signUp} from 'redux/modules/session/actions';
import {SIGNUP} from 'redux/modules/session/constants';

import {CheckoutAuth} from './components';

const CheckoutAuthGuestContainer = ({
  collectionSlug,
  cartUuid,
  signUpForced,
  paymentRequired,
  value,
  onChangeValue,
  onChangeAuthMode,
}) => {
  const dispatch = useDispatch();

  const status = useSelector(state => state.async.statuses[SIGNUP]);
  const errorMessage = useSelector(state => {
    const signUpError = state.async.errors[SIGNUP];

    return (
      _.get(signUpError, 'data.errors.email') ||
      _.get(signUpError, 'data.errors.password')
    );
  });

  const [password, setPassword] = React.useState('');

  const handleSignUp = React.useCallback(() => {
    dispatch(
      signUp({
        first_name: value.firstName,
        last_name: value.lastName,
        email: value.email,
        password,
        country: 'United States',
        profile: {
          signupSource: 'payment_page',
          bestDescribesYou: 'payer',
          referrer: {
            collection: collectionSlug,
            payment: cartUuid,
          },
        },
      })
    );
  }, [collectionSlug, cartUuid, value, password, dispatch]);

  return (
    <CheckoutAuth.Guest
      signUpForced={signUpForced && !process.env.REACT_APP_SELF_SIGNUP_DISABLED}
      paymentRequired={paymentRequired}
      value={value}
      password={password}
      status={status}
      errorMessage={errorMessage}
      onChangeValue={onChangeValue}
      onChangePassword={setPassword}
      onChangeAuthMode={onChangeAuthMode}
      onSignUp={handleSignUp}
    />
  );
};

const EnhancedCheckoutAuthGuestContainer = React.memo(
  CheckoutAuthGuestContainer
);

export default EnhancedCheckoutAuthGuestContainer;
