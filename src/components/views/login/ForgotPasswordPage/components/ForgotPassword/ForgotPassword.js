import {Link} from 'react-router-dom';
import React from 'react';

import {Button, Status} from 'elements';

import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = ({
  className,
  loginPath,
  forgotPasswordStatus,
  onClickConfirm,
  onSubmit,
}) => (
  <div className={className}>
    <div className="pt4 mb3 tc">
      <h1 className="mb3">Reset Password</h1>
      <p className="f6 avenir-light">
        {forgotPasswordStatus === 'success' ? (
          <>
            If your email is linked to an account, we’ll send an email with an
            updated password reset link.
            <br />
            <br />
            If you don’t see it in your inbox, remember to check your junk or
            spam folder.
          </>
        ) : (
          <>
            Forgot your password?
            <br />
            <br />
            Just enter the email address you use to login and and we&apos;ll
            send you an email with instructions on how to reset your password.
          </>
        )}
      </p>
    </div>
    {forgotPasswordStatus === 'success' ? (
      <Button
        backgroundColorSet
        className="w-100 bg-brand"
        onClick={onClickConfirm}
      >
        Ok
      </Button>
    ) : (
      <ForgotPasswordForm
        disabled={forgotPasswordStatus === 'pending'}
        onSubmit={onSubmit}
      />
    )}
    {forgotPasswordStatus !== 'success' && (
      <Link to={loginPath} className="db mt2 tc f6 avenir-roman">
        Cancel
      </Link>
    )}
    {forgotPasswordStatus !== 'success' && (
      <div className="flex mt4 justify-center">
        <Status status={forgotPasswordStatus} />
      </div>
    )}
  </div>
);

const EnhancedForgotPassword = React.memo(ForgotPassword);

export default EnhancedForgotPassword;
