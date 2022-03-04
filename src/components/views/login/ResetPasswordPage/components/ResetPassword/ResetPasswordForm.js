import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, Input} from 'elements';

const ResetPasswordForm = ({onSubmit, handleSubmit}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      border
      className="mb2"
      type="password"
      borderRadius={false}
      placeholder="New password"
      name="password"
      component={Input}
    />
    <Field
      border
      className="mb2"
      type="password"
      borderRadius={false}
      placeholder="Confirm password"
      name="password_confirmation"
      component={Input}
    />
    <Button backgroundColorSet className="w-100 bg-brand">
      Change Password
    </Button>
  </form>
);

const enhance = reduxForm({
  form: 'ForgotPasswordForm',
  validate: values => {
    const errors = {};

    if (values.password) {
      if (values.password.length < 6) {
        errors.password = 'Password must be 6 characters.';
      } else if (values.password.search(/\d/) === -1) {
        errors.password = 'Password must have 1 number';
      }
    }

    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'Passwords must match';
    }

    return errors;
  },
});

const EnhancedResetPasswordForm = Object.assign(enhance(ResetPasswordForm), {
  propTypes: {
    onSubmit: PropTypes.func,
  },
});

export default EnhancedResetPasswordForm;
