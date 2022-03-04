import React from 'react';
import config from 'config';
import NavItem from 'elements/NavItem';

const GuestDrawerNav = ({location}) => (
  <nav className="flex flex-column">
    <NavItem
      className="mb3"
      to={{pathname: '/signup', search: location.search}}
    >
      Start Collecting
    </NavItem>
    <NavItem
      className="mb3"
      to={{pathname: '/contact', search: location.search}}
    >
      Contact Us
    </NavItem>
    {config.isCheddarUp && (
      <NavItem
        className="mb3"
        to={{pathname: '/i/plans', search: location.search}}
      >
        Upgrade
      </NavItem>
    )}
    {!process.env.REACT_APP_SELF_SIGNUP_DISABLED && (
      <NavItem
        className="mb3"
        to={{pathname: '/signup', search: location.search}}
      >
        Sign Up Free
      </NavItem>
    )}
    <NavItem to={{pathname: '/login', search: location.search}}>Log in</NavItem>
  </nav>
);

const EnhancedGuestDrawerNav = React.memo(GuestDrawerNav);

export default EnhancedGuestDrawerNav;
