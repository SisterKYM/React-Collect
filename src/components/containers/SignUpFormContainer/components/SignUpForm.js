import {Field, reduxForm} from 'redux-form';
import React from 'react';
import cx from 'classnames';

import {Button, Input, Status} from 'elements';

const FORM_ERRORS = {
  REQUIRED: '* required',
  passwordLength: 'Your password must be at least 6 characters.',
  passwordNumber: 'Your password must contain at least 1 number.',
  country: 'Select a country',
  BAD_EMAIL: 'Your email address is invalid',
};

const SignUpForm = ({
  submitButtonWhiteBorder,
  signUpStatus,
  handleSubmit,
  onSubmit,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flex mb3">
      <Field
        border
        className="mr2"
        name="first_name"
        component={Input}
        placeholder="First Name"
      />
      <Field
        border
        name="last_name"
        component={Input}
        placeholder="Last Name"
      />
    </div>
    <Field
      border
      className="mb3"
      name="email"
      component={Input}
      placeholder="Email"
    />
    <Field
      border
      className="mb3"
      type="password"
      name="password"
      component={Input}
      placeholder="Password"
    />
    <div className="flex flex-wrap flex-column w-100 mt3 items-center">
      {signUpStatus === 'pending' ? (
        <Status status="pending" />
      ) : (
        <Button
          backgroundColorSet
          className={cx(
            'w-100 brand',
            submitButtonWhiteBorder && 'ba b--white'
          )}
        >
          Get started for FREE
        </Button>
      )}
    </div>
  </form>
);

const emailFormat = /^[\w!#$%&'*+./=?^`{|}~-]+@[\da-z](?:[\da-z-]{0,61}[\da-z])?(?:\.[\da-z](?:[\da-z-]{0,61}[\da-z])?)*\s*$/i;

const enhance = reduxForm({
  form: 'SignUpForm',
  validate: (values, props) => {
    if (!values) {
      return {};
    }

    const errors = {};

    if (!values.first_name) {
      errors.first_name = FORM_ERRORS.REQUIRED;
    }
    if (!values.last_name) {
      errors.last_name = FORM_ERRORS.REQUIRED;
    }
    if (!values.email) {
      errors.email = FORM_ERRORS.REQUIRED;
    }
    if (values.email && !emailFormat.test(values.email)) {
      errors.email = FORM_ERRORS.BAD_EMAIL;
    }

    if (!values.password || values.password.length < 6) {
      errors.password = FORM_ERRORS.passwordLength;
    }
    if (values.password && values.password.search(/\d/) === -1) {
      errors.password = FORM_ERRORS.passwordNumber;
    }
    if (props.countrySelectDisplayed && !values.country) {
      errors.country = FORM_ERRORS.country;
    }

    return errors;
  },
});

const EnhancedSignUpForm = enhance(SignUpForm);

export default EnhancedSignUpForm;
