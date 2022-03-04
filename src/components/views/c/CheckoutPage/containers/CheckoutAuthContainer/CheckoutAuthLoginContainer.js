import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

import {formatLoginError} from 'helpers/apiResponseHelpers';
import {login} from 'redux/modules/session/actions';
import {LOGIN} from 'redux/modules/session/constants';

import {CheckoutAuth} from './components';

const CheckoutAuthLoginContainer = ({signUpForced, onChangeAuthMode}) => {
  const dispatch = useDispatch();

  const status = useSelector(state => state.async.statuses[LOGIN]);
  const errorMessage = useSelector(state => {
    const loginError = state.async.errors[LOGIN];

    return loginError ? formatLoginError(loginError) : null;
  });

  const [value, setValue] = React.useState({email: '', password: ''});

  const handleLogin = React.useCallback(() => {
    dispatch(login(value));
  }, [value, dispatch]);

  return (
    <CheckoutAuth.Login
      signUpForced={signUpForced && !process.env.REACT_APP_SELF_SIGNUP_DISABLED}
      status={status}
      errorMessage={errorMessage}
      forgotPasswordTo="/login/forgot-password"
      value={value}
      onChangeValue={setValue}
      onChangeAuthMode={onChangeAuthMode}
      onLogin={handleLogin}
    />
  );
};

const EnhancedCheckoutAuthLoginContainer = React.memo(
  CheckoutAuthLoginContainer
);

export default EnhancedCheckoutAuthLoginContainer;
