import {setDisplayName, compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import React from 'react';

import {NavItem, Button} from 'elements';
import {ORGS} from 'data/orgs';

const enhance = compose(
  setDisplayName('views/orgs/signup/components/PrimaryNav'),
  withRouter,
  React.memo
);

export default enhance(({org, location}) => (
  <nav className="flex items-center">
    {ORGS[org] && ORGS[org].howItWorksVideoUrl && (
      <NavItem
        to={`${location.pathname}/i/orgs/${org}/how-it-works`}
        className="mr3"
      >
        <Button small>Video Tutorial</Button>
      </NavItem>
    )}
    {ORGS[org] && ORGS[org].faqUrl && (
      <NavItem href={ORGS[org].faqUrl} target="_blank">
        FAQ
      </NavItem>
    )}
  </nav>
));
