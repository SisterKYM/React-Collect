import CheckoutAuthGuest from './CheckoutAuthGuest';
import CheckoutAuthLoggedIn from './CheckoutAuthLoggedIn';
import CheckoutAuthLogin from './CheckoutAuthLogin';

const CheckoutAuth = {
  Guest: CheckoutAuthGuest,
  LoggedIn: CheckoutAuthLoggedIn,
  Login: CheckoutAuthLogin,
};

export default CheckoutAuth;
