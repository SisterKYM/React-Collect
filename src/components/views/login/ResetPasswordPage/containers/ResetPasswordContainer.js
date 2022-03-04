import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

import {RESET_PASSWORD} from 'redux/modules/session/constants';
import {resetPassword} from 'redux/modules/session/actions';

import {ResetPassword} from '../components';

const ResetPasswordContainer = ({
  className,
  view,
  code,
  email,
  onVerifyTwoFactor,
}) => {
  const payloadRef = React.useRef({});

  const dispatch = useDispatch();

  const resetPasswordStatus = useSelector(
    (state) => state.async.statuses[RESET_PASSWORD]
  );
  const resetPasswordError = useSelector(
    (state) => state.async.errors[RESET_PASSWORD]
  );

  React.useEffect(() => {
    if (
      resetPasswordError &&
      resetPasswordError.data &&
      resetPasswordError.data.errors &&
      resetPasswordError.data.errors[0] &&
      resetPasswordError.data.errors[0].error === 'security_token_sent'
    ) {
      onVerifyTwoFactor(payloadRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetPasswordError]);

  const handleSubmit = React.useCallback(
    (values) => {
      payloadRef.current = {
        ...values,
        code,
        email,
      };

      dispatch(resetPassword(payloadRef.current));
    },
    [code, email, dispatch]
  );

  return (
    <ResetPassword
      view={view}
      className={className}
      resetPasswordStatus={resetPasswordStatus}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedResetPasswordContainer = React.memo(ResetPasswordContainer);

export default EnhancedResetPasswordContainer;
