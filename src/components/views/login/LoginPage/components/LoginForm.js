import {Field, reduxForm} from 'redux-form';
import React from 'react';

import {Button, Input} from 'elements';

const LoginForm = ({invalid, disabled, onSubmit, handleSubmit}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      border
      type="text"
      name="email"
      component={Input}
      disabled={disabled}
      placeholder="Email"
      className="mb3"
    />
    <Field
      border
      type="password"
      name="password"
      component={Input}
      disabled={disabled}
      placeholder="Password"
      className="mb3"
    />
    <Button
      backgroundColorSet
      className="w-100 bg-brand"
      disabled={disabled || invalid}
    >
      Log in
    </Button>
  </form>
);

const enhance = reduxForm({
  form: 'LoginForm',
  validate(values) {
    const err = {};
    if (!values.email) {
      err.email = '* required';
    }
    if (!values.password) {
      err.password = '* required';
    }

    return err;
  },
});

const EnhancedLoginForm = enhance(LoginForm);

export default EnhancedLoginForm;
