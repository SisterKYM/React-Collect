import React from 'react';
import config from 'config';

import Button from 'elements/Button';
import NavItem from 'elements/NavItem';

const GuestNav = ({location}) => (
  <nav className="flex items-center">
    <NavItem className="mr4" to="/signup">
      Start Collecting
    </NavItem>
    {config.enabledFeatures.subscriptions && (
      <NavItem className="mr4" to={`${location.pathname}/i/plans`}>
        Plans
      </NavItem>
    )}
    <NavItem className="mr4" href={config.links.videoTutorials} target="_blank">
      <Button small>How To Videos</Button>
    </NavItem>
  </nav>
);

const EnhancedGuestNav = React.memo(GuestNav);

export default EnhancedGuestNav;
