import React from 'react';

import {Checkbox, TextInput, Touchable} from 'elements';
import config from 'config';
import useToggle from 'hooks/useToggle';

import CheckoutAuthHeading from './CheckoutAuthHeading';

const EMAIL_REGEX = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d-AZa-z-]+\.)+[A-Za-z]{2,}))$/;
const siteIsPixieLane = config.siteName === 'PIXIE_LANE';

const CheckoutAuthGuest = ({
  signUpForced,
  paymentRequired,
  value,
  password,
  status,
  errorMessage,
  onChangeValue,
  onChangePassword,
  onChangeAuthMode,
  onSignUp,
}) => {
  const [signUpModeEnabled, toggleSignUpModeEnabled] = useToggle(signUpForced);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

  React.useEffect(() => {
    if (signUpForced) {
      toggleSignUpModeEnabled.on();
    } else {
      toggleSignUpModeEnabled.off();
    }
  }, [signUpForced]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const emailValid = EMAIL_REGEX.test(value.email);
    const nextEmailErrorMessage = emailValid ? '' : 'Invalid format';

    setEmailErrorMessage(value.email.length !== 0 ? nextEmailErrorMessage : '');
  }, [value.email]);

  return (
    <div>
      <CheckoutAuthHeading
        heading={
          signUpModeEnabled
            ? 'Create an Account'
            : `Where should we send your ${
                paymentRequired ? 'receipt' : 'confirmation'
              }?`
        }
        actionTitleHint={siteIsPixieLane ? '' : 'Already have an account?'}
        actionTitle={siteIsPixieLane ? '' : 'Log in'}
        onClickActionTitle={
          siteIsPixieLane
            ? undefined
            : () => {
                onChangeAuthMode('LOGIN');
              }
        }
      />
      {signUpForced && (
        <p className="mt3 f6 avenir-light gray-600">
          Create an account to save a payment method for your recurring payment
        </p>
      )}
      <div className="cf mt4">
        <TextInput
          required
          name="firstName"
          className="fl w-100 w-third-ns pt2 pt0-ns pr2-ns mb3"
          autoComplete="given-name"
          label="First Name"
          value={value.firstName}
          onChange={(event) => {
            onChangeValue({
              ...value,
              firstName: event.target.value,
            });
          }}
        />
        <TextInput
          required
          name="lastName"
          className="fl w-100 w-third-ns pt2 pt0-ns ph2-ns mb3"
          autoComplete="family-name"
          label="Last Name"
          value={value.lastName}
          onChange={(event) => {
            onChangeValue({
              ...value,
              lastName: event.target.value,
            });
          }}
        />
        <TextInput
          required
          name="email"
          className="fl w-100 w-third-ns pt2 pt0-ns pl2-ns mb3"
          type="email"
          autoComplete="email"
          label="Email"
          errorMessage={emailErrorMessage}
          value={value.email}
          onChange={(event) => {
            onChangeValue({
              ...value,
              email: event.target.value,
            });
          }}
        />
      </div>
      {signUpModeEnabled && (
        <div className="cf">
          <TextInput
            required
            name="password"
            className="fl w-100 w-third-ns pt2 pr2-ns"
            type="password"
            label="Create Password"
            value={password}
            onChange={(event) => {
              onChangePassword(event.target.value);
            }}
          />
          {errorMessage && (
            <div
              style={{marginTop: '40px'}}
              className="fl w-100 w-two-thirds-ns pt2 ph2-ns f6 avenir-roman brand"
            >
              {errorMessage}
            </div>
          )}
        </div>
      )}
      {!signUpForced && !process.env.REACT_APP_SELF_SIGNUP_DISABLED && (
        <Checkbox
          name="signUp"
          className="mt3 items-start"
          labelClassName="f6 lh-copy avenir-light gray-600"
          label="Save this information to create an account and make checkouts faster"
          checked={signUpModeEnabled}
          onChange={toggleSignUpModeEnabled.switch}
          alignStart
        />
      )}
      {signUpModeEnabled && (
        <p className="mv3 f6 gray-600">
          I accept the
          <a
            className="ml1"
            href={config.links.terms}
            rel="noopener noreferrer"
            target="_blank"
          >
            terms of use
          </a>
          &nbsp;and
          <a
            className="ml1"
            href={config.links.privacyPolicy}
            rel="noopener noreferrer"
            target="_blank"
          >
            privacy policy
          </a>
          .
        </p>
      )}
      {signUpModeEnabled && (
        <div className="mt4 flex items-center">
          <Touchable
            className="w-100 w5-ns pv2 f6 dim white bg-tint"
            disabled={
              value.firstName.length === 0 ||
              value.lastName.length === 0 ||
              value.email.length === 0 ||
              password.length === 0 ||
              emailErrorMessage
            }
            loading={status === 'pending'}
            onClick={onSignUp}
          >
            Sign Up
          </Touchable>
        </div>
      )}
    </div>
  );
};

const EnhancedCheckoutAuthGuest = React.memo(CheckoutAuthGuest);

export default EnhancedCheckoutAuthGuest;
