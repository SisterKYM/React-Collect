import {Route} from 'react-router-dom';
import React from 'react';

import AuthHocs from 'helpers/AuthHocs';

import DowngradePage from './DowngradePage';
import PlanPausePage from './PlanPausePage';
import PlansBasicErrorPage from './PlansBasicErrorPage';
import PlansPage from './PlansPage';
import ProPlanPage from './ProPlanPage';
import ProPlanWarningPage from './ProPlanWarningPage';
import TeamUpgradePage from './TeamUpgradePage';
import UpgradeRequiredPage from './UpgradeRequiredPage';

const WithAuthProPlanPage = AuthHocs.requireAuthenticated(
  ProPlanPage,
  '/signup'
);
const WithAuthTeamUpgradePage = AuthHocs.requireAuthenticated(
  TeamUpgradePage,
  '/signup'
);

const PlansRouter = () => (
  <>
    <Route exact path="*/i/plans" component={PlansPage} />
    <Route exact path="*/i/plans/basic/error" component={PlansBasicErrorPage} />
    <Route path="*/i/plans/pro:isDowngrade?" component={WithAuthProPlanPage} />
    <Route
      path="*/i/plans/pro/warning:isDowngrade"
      component={ProPlanWarningPage}
    />
    <Route path="*/i/plans/downgrade:to" component={DowngradePage} />
    <Route path="*/i/plans/pause:to?" component={PlanPausePage} />
    <Route
      path="*/collection/:owner/:collection/*/i/plans/upgrade-required"
      component={UpgradeRequiredPage}
    />
    <Route path="*/i/plans/team-upgrade" component={WithAuthTeamUpgradePage} />

    <Route
      path="*/collection/:owner/:collection/*/i/plans/pro:isDowngrade?"
      component={WithAuthProPlanPage}
    />
    <Route
      path="*/collection/:owner/:collection/*/i/plans/downgrade:to"
      component={DowngradePage}
    />
    <Route
      path="*/collection/:owner/:collection/*/i/plans/team-upgrade"
      component={WithAuthTeamUpgradePage}
    />
  </>
);

const EnhancedPlansRouter = React.memo(PlansRouter);

export default EnhancedPlansRouter;
