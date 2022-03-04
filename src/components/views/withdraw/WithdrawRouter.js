import {Route, Switch} from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import WithdrawPage from './WithdrawPage';
import WithdrawNegativeBalancePage from './WithdrawNegativeBalancePage';

const PoseContainer = posed.div();

const WithdrawRouter = ({location}) => (
  <>
    <Route path="/withdraw" component={WithdrawPage} />
    <PoseGroup>
      <PoseContainer key={location.pathname}>
        <Switch location={location}>
          <Route
            path="/withdraw/negative-balance"
            component={WithdrawNegativeBalancePage}
          />
        </Switch>
      </PoseContainer>
    </PoseGroup>
  </>
);

const EnhancedWithdrawRouter = React.memo(WithdrawRouter);

export default EnhancedWithdrawRouter;
