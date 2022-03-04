import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import React from 'react';

import {Button, Input} from 'elements';

const ForgotPasswordFom = ({invalid, disabled, onSubmit, handleSubmit}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Field
      border
      className="mb4"
      borderRadius={false}
      disabled={disabled}
      placeholder="Email Address"
      name="email"
      component={Input}
    />
    <Button
      backgroundColorSet
      className="w-100 bg-brand"
      disabled={invalid || disabled}
    >
      Send instructions
    </Button>
  </form>
);

ForgotPasswordFom.propTypes = {
  onSubmit: PropTypes.func,
};

const enhance = reduxForm({
  form: 'ForgotPasswordForm',
  validate: values => ({
    email: values.email ? undefined : '* required',
  }),
});

const EnhancedForgotPasswordFom = enhance(ForgotPasswordFom);

export default EnhancedForgotPasswordFom;
