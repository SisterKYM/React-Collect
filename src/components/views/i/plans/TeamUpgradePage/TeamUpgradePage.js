import React from 'react';

import {UpgradePlanContainer} from 'containers';

const fieldPanels = [
  {
    description: (
      <>
        <span className="flamingo">Best Value!</span>&nbsp;
        <span>$360</span>
        &nbsp;charged yearly (Equals $30/month)
      </>
    ),
    title: <span>Team: Yearly</span>,
    value: 'team_annual',
    price: 360,
  },
  {
    description: '$36 charged monthly',
    title: 'Team: Monthly',
    value: 'team_monthly',
    price: 36,
  },
];

const TeamUpgradePage = () => (
  <UpgradePlanContainer
    fieldPanels={fieldPanels}
    heading="The Team Plan"
    subheading={
      <>
        The Cheddar Up TEAM plan is paid yearly or monthly. We make it simple to
        adjust your plan at any time from your My Account page.
      </>
    }
  />
);

const EnhancedTeamUpgradePage = React.memo(TeamUpgradePage);

export default EnhancedTeamUpgradePage;
