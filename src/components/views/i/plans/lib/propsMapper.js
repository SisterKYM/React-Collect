import React from 'react';
import cx from 'classnames';
import {capitalize, replace} from 'lodash';

import config from 'config';

const proPanelFeatures = [
  {
    children: 'All Basic features plus:',
    check: false,
    className: 'avenir-roman',
  },
  {
    children: 'Unlimited items, forms and waivers per collection',
    check: true,
  },
  {children: 'Require entry code', check: true},
  {children: 'Offer discounts', check: true},
  {children: 'Set start and end times', check: true},
  {children: 'Include taxes', check: true},
  {children: 'Add shipping at checkout', check: true},
  {
    children: 'Add multiple item images and variations (e.g. size and color)',
    check: true,
  },
  {children: 'Visitor Reports', check: true},
];

const teamPanelFeatures = [
  {
    children: 'All PRO features plus:',
    check: false,
    className: 'avenir-roman',
  },
  {
    children: 'Add managers and share data while keeping banking info private',
    check: true,
  },
  {
    children: `A Group Page - one URL with all of your ${config.strings.collection}s`,
    check: true,
  },
  {children: 'Account-wide reporting', check: true},
  {children: 'Automatic (recurring) payments', check: true},
];

const propsMapper = ({
  planName,
  isPause,
  isProUser,
  isTeamUser,
  authenticated,
  updateSubscriptionStatus,
  accountPlan,
  checkStatus,
  ...props
}) => {
  const planFromStripe = replace(replace(planName, ')', ''), '(', '');
  let plan;
  if (planFromStripe === 'BASIC') {
    plan = 'Basic';
  } else if (planFromStripe.includes('Pause')) {
    plan = 'Pro Pause';
  } else {
    plan = planFromStripe;
  }

  return {
    ...props,
    isProUser,
    isTeamUser,
    isPause,
    accountPlan,
    authenticated,
    isFree: authenticated && !isPause && !isProUser && !isTeamUser,
    hasPro: isProUser && !isTeamUser,
    hasTeam: isTeamUser,
    heading: authenticated
      ? `My current plan: ${plan}`
      : "Choose the plan that's right for you.",
    checkResultsPending: checkStatus === 'pending',
    subheading:
      accountPlan === 'pause'
        ? 'Reactivate and Upgrade to PRO'
        : 'View Billing Information',
    containerClassName: 'content-container ph4',
    panelClassName: cx('flex w-100 w-third-l', 'mb3 mb0-l'),
    updateSubscriptionPending: updateSubscriptionStatus === 'pending',
    basicPanelFeatures: [
      {children: 'Up to 5 items per collection', check: true},
      {children: 'Up to 1 form or waiver', check: true},
      {children: 'Track online and offline payments', check: true},
      {children: 'One-click spreadsheet export', check: true},
      {children: 'Free and unlimited withdrawals', check: true},
      {
        children: (
          <span>
            Low processing{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://support.cheddarup.com/hc/en-us/articles/360035586731-About-fees"
            >
              fees
            </a>
          </span>
        ),
        check: true,
      },
    ],
    proPanelFeatures,
    teamPanelFeatures,
  };
};

export default propsMapper;
