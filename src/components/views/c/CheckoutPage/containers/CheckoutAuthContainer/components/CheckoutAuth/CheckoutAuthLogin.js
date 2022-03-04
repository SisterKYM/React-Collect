import {Link} from 'react-router-dom';
import React from 'react';

import {Button, TextInput} from 'elements';

import CheckoutAuthHeading from './CheckoutAuthHeading';

const CheckoutAuthLogin = ({
  forcedSignUp,
  status,
  errorMessage,
  forgotPasswordTo,
  value,
  onChangeAuthMode,
  onChangeValue,
  onLogin,
}) => {
  const handleClickActionTitle = React.useCallback(() => {
    onChangeAuthMode('GUEST');
  }, [onChangeAuthMode]);

  const handleChangeEmail = React.useCallback(
    event => {
      onChangeValue({
        ...value,
        email: event.target.value,
      });
    },
    [value, onChangeValue]
  );
  const handleChangePassword = React.useCallback(
    event => {
      onChangeValue({
        ...value,
        password: event.target.value,
      });
    },
    [value, onChangeValue]
  );

  return (
    <div>
      <CheckoutAuthHeading
        heading="Log in"
        actionTitleHint={forcedSignUp ? '' : 'Changed your mind?'}
        actionTitle={forcedSignUp ? 'Create an account' : 'Continue as guest'}
        onClickActionTitle={handleClickActionTitle}
      />
      <div className="w-100 mt4">
        <TextInput
          required
          className="w5"
          label="Email"
          value={value.email}
          onChange={handleChangeEmail}
        />
        <TextInput
          required
          className="w5 mt3"
          type="password"
          label="Password"
          value={value.password}
          onChange={handleChangePassword}
        />
        <div className="mt2">
          <Link className="f6 dim" target="_blank" to={forgotPasswordTo}>
            Forgot password?
          </Link>
        </div>
        <div className="mt4 flex items-center">
          <Button
            className="w5 dim"
            disabled={value.email.length === 0 || value.password.length === 0}
            status={status}
            onClick={onLogin}
          >
            Log In
          </Button>
          {errorMessage && (
            <div className="ml3 f6 avenir-roman brand">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const EnhancedCheckoutAuthLogin = React.memo(CheckoutAuthLogin);

export default EnhancedCheckoutAuthLogin;
