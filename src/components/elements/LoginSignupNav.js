import PropTypes from 'prop-types';
import React from 'react';

import NavItem from 'elements/NavItem';

const LoginSignupNav = ({location, signUpDisplayed = true}) => (
  <nav className="flex items-center">
    <NavItem
      className="mh3 tint"
      to={{pathname: '/contact', search: location.search}}
    >
      Contact
    </NavItem>
    {signUpDisplayed && !process.env.REACT_APP_SELF_SIGNUP_DISABLED && (
      <NavItem
        className="mh3 brand"
        to={{pathname: '/signup', search: location.search}}
      >
        Sign up FREE
      </NavItem>
    )}
    <NavItem
      className="mh3 tint"
      to={{pathname: '/login', search: location.search}}
    >
      Log in
    </NavItem>
  </nav>
);

const EnhancedLoginSignupNav = Object.assign(React.memo(LoginSignupNav), {
  propTypes: {
    signUpDisplayed: PropTypes.bool,
  },
});

export default EnhancedLoginSignupNav;
