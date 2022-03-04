import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import InviteMembersPage from './InviteMembersPage';
import ResendAllConfirmRouter from './resend-all-confirm/Router';

const PoseContainer = posed.div();

const InviteMembersRouter = ({location}) => (
  <>
    <Route component={InviteMembersPage} path="/user/invite-members" />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            component={ResendAllConfirmRouter}
            path="/user/invite-members/resend-all-confirm"
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedInviteMembersRouter = React.memo(InviteMembersRouter);

export default EnhancedInviteMembersRouter;
