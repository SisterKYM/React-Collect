import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from 'react-router-dom';
import _ from 'lodash';
import React from 'react';

import {CHANGE_PASSWORD} from 'redux/modules/session/constants';
import {requestVerificationCode} from 'redux/modules/session/actions';

import {ChangePasswordForm} from './components';

const ChangePasswordFormContainer = ({className}) => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const session = useSelector(state => state.session);
  const status = useSelector(state => state.async.statuses[CHANGE_PASSWORD]);

  const handleSubmit = React.useCallback(
    (values, _dispatch, form) => {
      const pathname = location.pathname;
      const shouldAddPhone =
        _.get(session, 'phoneJustReset') ||
        !(
          _.get(session, 'user.profile.phone.verified') ||
          _.get(session, 'phoneJustVerified')
        );

      if (shouldAddPhone) {
        history.push(`${pathname}/phone/add-phone`);
      } else {
        dispatch(requestVerificationCode());

        history.push({
          pathname: `${pathname}/phone/verify`,
          state: {
            verifyActionType: CHANGE_PASSWORD,
            payload: {
              user: {
                current_password: values.currentPassword,
                password: values.newPassword,
                password_confirmation: values.confirmPassword,
              },
            },
          },
        });

        form.reset();
      }
    },
    [dispatch, history, location.pathname, session]
  );

  return (
    <ChangePasswordForm
      className={className}
      status={status}
      onSubmit={handleSubmit}
    />
  );
};

const EnhancedChangePasswordFormContainer = React.memo(
  ChangePasswordFormContainer
);

export default EnhancedChangePasswordFormContainer;
