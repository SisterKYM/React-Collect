import React from 'react';

import {UpgradePlanContainer} from 'containers';

const FIELD_PANELS = [
  {
    description: (
      <span>
        <span className="flamingo">Best Value!</span>&nbsp;$120 charged yearly
        (Equals $10/month)
      </span>
    ),
    title: <span>Pro: Yearly</span>,
    value: 'pro_annual',
    price: 120,
  },
  {
    description: '$65 charged every 6 months',
    title: 'Pro: Biannual',
    value: 'pro_semi_annual',
    price: 65,
  },
  {
    description: '$12 charged monthly',
    title: 'Pro: Monthly',
    value: 'pro_monthly',
    price: 12,
  },
];

const ProPlanPage = () => (
  <UpgradePlanContainer
    fieldPanels={FIELD_PANELS}
    heading="The Pro Plan"
    subheading="The Cheddar Up PRO plan is paid yearly, biannually or monthly. We make it simple to adjust your plan at any time from your My Account page."
  />
);

const EnhancedProPlanPage = React.memo(ProPlanPage);

export default EnhancedProPlanPage;
