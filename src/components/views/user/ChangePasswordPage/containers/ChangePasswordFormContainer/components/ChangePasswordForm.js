import {reduxForm} from 'redux-form';
import React from 'react';

import {Button, Status} from 'elements';

import ChangePasswordFormField from './ChangePasswordFormField';

const formErrors = {
  DIFFERENT: 'Must be different',
  EQUAL: 'Must be equal',
  LENGTH: 'Include 6 characters',
  NUMBER: 'Include a number',
  REQUIRED: '*required',
};

const ChangePasswordForm = ({className, invalid, status, onSubmit, handleSubmit}) => (
  <form className={className} onSubmit={handleSubmit(onSubmit)}>
    <ChangePasswordFormField
      name="currentPassword"
      placeholder="Type your current password"
    />
    <ChangePasswordFormField name="newPassword" placeholder="New Password" />
    <ChangePasswordFormField
      name="confirmPassword"
      placeholder="Confirm Password"
    />
    <div className="flex mt4 items-center">
      <Button
        backgroundColorSet
        className="bg-brand"
        disabled={invalid || status === 'pending'}
      >
        Change Password
      </Button>
      {status === 'pending' && (
        <div className="ml2">
          <Status status={status} />
        </div>
      )}
    </div>
    <style jsx>{`
      form {
        max-width: 25rem;
      }
    `}</style>
  </form>
);

const enhance = reduxForm({
  form: 'ChangePasswordForm',
  validate: ({confirmPassword, currentPassword, newPassword}) => {
    const err = {};
    if (!currentPassword) {
      err.currentPassword = formErrors.REQUIRED;
    }

    if (!newPassword) {
      err.newPassword = formErrors.REQUIRED;
    } else if (newPassword.length < 6) {
      err.newPassword = formErrors.LENGTH;
    } else if (!/\d/.test(newPassword)) {
      err.newPassword = formErrors.NUMBER;
    }

    if (!confirmPassword) {
      err.confirmPassword = formErrors.REQUIRED;
    } else if (confirmPassword.length < 6) {
      err.confirmPassword = formErrors.LENGTH;
    } else if (!/\d/.test(confirmPassword)) {
      err.confirmPassword = formErrors.NUMBER;
    }

    if (currentPassword && newPassword && currentPassword === newPassword) {
      err.currentPassword = formErrors.DIFFERENT;
      err.newPassword = formErrors.DIFFERENT;
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      err.confirmPassword = formErrors.EQUAL;
      err.newPassword = formErrors.EQUAL;
    }

    return err;
  },
});

const EnhancedChangePasswordForm = enhance(ChangePasswordForm);

export default EnhancedChangePasswordForm;
