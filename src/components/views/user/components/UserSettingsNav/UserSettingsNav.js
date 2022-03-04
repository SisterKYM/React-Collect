import {IoMdSync} from 'react-icons/io';
import PropTypes from 'prop-types';
import React from 'react';

import config from 'config';

import SidebarNavItem from './SidebarNavItem';
import SidebarNavSection from './SidebarNavSection';

const URL_MAP = {
  billing: '/user/billing',
  password: '/user/password',
  paymentMethods: '/user/payment-methods',
  payments: '/user/payments',
  managers: '/user/managers',
  profile: '/user/profile',
  recurring: '/user/recurring-payments',
  withdrawalSettings: '/user/withdrawal-settings',
  inviteMembers: '/user/invite-members',
  members: '/user/members',
};

const UserSettingsNav = ({
  isPartnerMasterAccount,
  currentUrl,
  hasRecurring,
}) => (
  <nav className="flex flex-column">
    {/* <SidebarNavSection label="Profile"> */}
    <SidebarNavItem
      active={currentUrl && currentUrl.indexOf(URL_MAP.profile) === 0}
      label="Profile"
      to={URL_MAP.profile}
    />
    <SidebarNavItem
      active={currentUrl && currentUrl.indexOf(URL_MAP.password) === 0}
      label="Password"
      to={URL_MAP.password}
    />
    {/* </SidebarNavSection> */}
    {/* <SidebarNavSection label="Account"> */}
    {config.enabledFeatures.subscriptions && (
      <SidebarNavItem
        active={currentUrl && currentUrl.indexOf(URL_MAP.billing) === 0}
        label="Plan and Billing"
        to={URL_MAP.billing}
      />
    )}
    <SidebarNavItem
      active={
        currentUrl && currentUrl.indexOf(URL_MAP.withdrawalSettings) === 0
      }
      label="Withdrawal Settings"
      to={URL_MAP.withdrawalSettings}
    />
    <SidebarNavItem
      active={currentUrl && currentUrl.indexOf(URL_MAP.paymentMethods) === 0}
      label="Payment Methods"
      to={URL_MAP.paymentMethods}
    />
    {/* {config.enabledFeatures.managers && ( */}
    {/*  <SidebarNavItem */}
    {/*    active={currentUrl && currentUrl.indexOf(URL_MAP.managers) === 0} */}
    {/*    label="Managers" */}
    {/*    to={URL_MAP.managers} */}
    {/*  /> */}
    {/* )} */}
    {/* </SidebarNavSection> */}
    {/* <SidebarNavSection label="Payments"> */}
    {/*  <SidebarNavItem */}
    {/*    active={currentUrl && currentUrl.indexOf(URL_MAP.payments) === 0} */}
    {/*    label="Payments to Others" */}
    {/*    to={URL_MAP.payments} */}
    {/*  /> */}
    {/*  {hasRecurring && ( */}
    {/*    <SidebarNavItem */}
    {/*      active={currentUrl && currentUrl.indexOf(URL_MAP.recurring) === 0} */}
    {/*      icon={<IoMdSync />} */}
    {/*      label="Recurring Payments" */}
    {/*      to={URL_MAP.recurring} */}
    {/*    /> */}
    {/*  )} */}
    {/* </SidebarNavSection> */}
    {isPartnerMasterAccount && (
      <SidebarNavSection label="Partner Tools">
        <SidebarNavItem
          active={currentUrl && currentUrl.indexOf(URL_MAP.inviteMembers) === 0}
          label="Invite Members"
          to={URL_MAP.inviteMembers}
        />
        <SidebarNavItem
          active={currentUrl && currentUrl.indexOf(URL_MAP.members) === 0}
          label="Member Listing"
          to={URL_MAP.members}
        />
      </SidebarNavSection>
    )}
  </nav>
);

const EnhancedUserSettingsNav = Object.assign(React.memo(UserSettingsNav), {
  propTypes: {
    currentUrl: PropTypes.string.isRequired,
    isPartnerMasterAccount: PropTypes.bool,
    hasRecurring: PropTypes.bool,
  },
});

export default EnhancedUserSettingsNav;
