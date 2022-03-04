import React from 'react';

import {Status} from 'elements';

import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = ({view, className, resetPasswordStatus, onSubmit}) => (
  <div className={className}>
    <div className="pt5 mb3 tc">
      <h1 className="mb3">
        {view === 'signup' ? 'Set Your New' : 'Reset'} Password
      </h1>
      <p className="f6 lh-copy avenir-light">
        Please create a new password (minimum 6 characters and 1 number).
      </p>
    </div>
    <ResetPasswordForm onSubmit={onSubmit} />
    {resetPasswordStatus !== 'success' && (
      <div className="flex mt4 justify-center">
        <Status status={resetPasswordStatus} />
      </div>
    )}
  </div>
);

const EnhancedResetPassword = React.memo(ResetPassword);

export default EnhancedResetPassword;
