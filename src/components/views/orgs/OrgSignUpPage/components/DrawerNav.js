import {connect} from 'react-redux';
import {setDisplayName, compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import React from 'react';

import {NavItem} from 'elements';
import {ORGS} from 'data/orgs';

const enhance = compose(
  setDisplayName('views/orgs/signup/components/DrawerNav'),
  connect(({browser}) => ({browser})),
  withRouter,
  React.memo
);

export default enhance(({org, location, browser}) => (
  <nav className="flex flex-column">
    {ORGS[org] && ORGS[org].howItWorksVideoUrl && (
      <NavItem
        className="mb3"
        to={`${location.pathname}/i/orgs/${org}/how-it-works`}
      >
        Video Tutorial
      </NavItem>
    )}
    {ORGS[org] && ORGS[org].faqUrl && (
      <NavItem className="mb3" href={ORGS[org].faqUrl} target="_blank">
        FAQ
      </NavItem>
    )}
    {browser.lessThan.medium && <NavItem to="/login">Log in</NavItem>}
  </nav>
));
