import {Route, Switch} from 'react-router-dom';
import React from 'react';
import posed, {PoseGroup} from 'react-pose';

import DeleteWithdrawalSettingsWarningPage from './DeleteWithdrawalSettingsWarningPage';
import Page from './Page';

const PoseContainer = posed.div();

const WithdrawalSettingsRouter = ({location}) => (
  <>
    <Route component={Page} path="/user/withdrawal-settings" />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            component={DeleteWithdrawalSettingsWarningPage}
            path="/user/withdrawal-settings/delete-warning"
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedWithdrawalSettingsRouter = React.memo(WithdrawalSettingsRouter);

export default EnhancedWithdrawalSettingsRouter;
