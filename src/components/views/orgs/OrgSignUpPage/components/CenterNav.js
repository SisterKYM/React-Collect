import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import React from 'react';

import {NavItem, Button} from 'elements';
import {ORGS} from 'data/orgs';

const CenterNav = ({org, location}) => (
  <nav className="flex items-center">
    <div>
      {ORGS[org] && ORGS[org].howItWorksVideoUrl && (
        <NavItem to={`${location.pathname}/i/orgs/${org}/how-it-works`}>
          <Button small>Video Tutorial</Button>
        </NavItem>
      )}
    </div>
  </nav>
);

const enhance = compose(
  withRouter,
  React.memo
);

const EnhancedCenterNav = enhance(CenterNav);

export default EnhancedCenterNav;
