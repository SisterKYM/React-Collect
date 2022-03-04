import {Route, Switch} from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import CollectionShareLinkPage from './CollectionShareLinkPage';
import InviteMessagePage from './InviteMessagePage';
import InviteRemindersPage from './InviteRemindersPage';

const PoseContainer = posed.div();

const Router = ({location}) => (
  <>
    <Route
      path="/collection/:owner/:collection/share"
      component={CollectionShareLinkPage}
    />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/collection/:owner/:collection/share/invitations/message"
            component={InviteMessagePage}
          />
          <Route
            path="/collection/:owner/:collection/share/invitations/reminders"
            component={InviteRemindersPage}
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

export default Router;
