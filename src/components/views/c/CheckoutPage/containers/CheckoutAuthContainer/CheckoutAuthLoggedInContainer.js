import {useDispatch} from 'react-redux';
import React from 'react';

import {logout} from 'redux/modules/session/actions';

import {CheckoutAuth} from './components';

const CheckoutAuthLoggedInContainer = ({email}) => {
  const dispatch = useDispatch();

  const handleLogout = React.useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return <CheckoutAuth.LoggedIn email={email} onLogout={handleLogout} />;
};

const EnhancedCheckoutAuthLoggedInContainer = React.memo(
  CheckoutAuthLoggedInContainer
);

export default EnhancedCheckoutAuthLoggedInContainer;
