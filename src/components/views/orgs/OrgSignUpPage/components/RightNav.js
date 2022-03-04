import React from 'react';

import {NavItem} from 'elements';

const RightNav = ({location}) => (
  <nav className="flex items-center">
    <NavItem to={{pathname: '/login', search: location.search}} className="pr3">
      Have an account? <span className="brand">Log in</span>
    </NavItem>
  </nav>
);

const EnhancedRightNav = React.memo(RightNav);

export default EnhancedRightNav;
