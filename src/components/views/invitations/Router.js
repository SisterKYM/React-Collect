import {Route, Switch} from 'react-router-dom';
import {compose, pure, setDisplayName} from 'recompose';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import InvitationsPage from 'views/invitations/Page';
import NotFoundPage from 'views/NotFoundPage';

const enhance = compose(
  setDisplayName('views/invitations/Router'),
  pure
);

const PoseContainer = posed.div();

export default enhance(({location}) => (
  <Switch>
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/invitations/manager/account/:manager/:invitation"
            component={InvitationsPage}
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
    <Route component={NotFoundPage} />
  </Switch>
));
