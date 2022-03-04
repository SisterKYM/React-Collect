import {useSelector} from 'react-redux';
import React from 'react';

import CheckoutAuthGuestContainer from './CheckoutAuthGuestContainer';
import CheckoutAuthLoggedInContainer from './CheckoutAuthLoggedInContainer';
import CheckoutAuthLoginContainer from './CheckoutAuthLoginContainer';

const CheckoutAuthContainer = ({
  collectionSlug,
  cartUuid,
  paymentRequired,
  cartHasRecurringItems,
  guestValue,
  onChangeGuestValue,
}) => {
  const user = useSelector(state => state.session && state.session.user);

  const [authMode, setAuthMode] = React.useState(user ? 'LOGGED_IN' : 'GUEST');

  React.useEffect(() => {
    setAuthMode(user ? 'LOGGED_IN' : 'GUEST');
  }, [user]);

  const renderAuthStateView = React.useCallback(() => {
    switch (authMode) {
      case 'LOGGED_IN':
        return (
          <CheckoutAuthLoggedInContainer email={user ? user.email : null} />
        );
      case 'GUEST':
        return (
          <CheckoutAuthGuestContainer
            collectionSlug={collectionSlug}
            cartUuid={cartUuid}
            signUpForced={
              cartHasRecurringItems &&
              !process.env.REACT_APP_SELF_SIGNUP_DISABLED
            }
            paymentRequired={paymentRequired}
            value={guestValue}
            onChangeValue={onChangeGuestValue}
            onChangeAuthMode={setAuthMode}
          />
        );
      case 'LOGIN':
        return (
          <CheckoutAuthLoginContainer
            signUpForced={
              cartHasRecurringItems &&
              !process.env.REACT_APP_SELF_SIGNUP_DISABLED
            }
            onChangeAuthMode={setAuthMode}
          />
        );
      default:
        return null;
    }
  }, [
    authMode,
    user,
    collectionSlug,
    cartUuid,
    cartHasRecurringItems,
    paymentRequired,
    guestValue,
    onChangeGuestValue,
  ]);

  return (
    <div className="ph3 ph4-ns pv4 bg-white br2-ns shadow-6">
      {renderAuthStateView()}
    </div>
  );
};

const EnhancedCheckoutAuthContainer = React.memo(CheckoutAuthContainer);

export default EnhancedCheckoutAuthContainer;
