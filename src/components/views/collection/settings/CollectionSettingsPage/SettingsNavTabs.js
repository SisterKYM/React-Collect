import React from 'react';

import {collectionsPathHelper} from 'helpers';
import {TopTabBar} from 'elements';
import config from 'config';

const SettingsNavTabs = ({className, currentPathname, collection}) => {
  const navigationItems = React.useMemo(
    () =>
      [
        {
          label: 'Payments',
          pathname: collectionsPathHelper(collection, 'settings/payments'),
        },
        {
          label: 'Shipping and Discounts',
          pathname: collectionsPathHelper(
            collection,
            'settings/shipping-and-discounts'
          ),
        },
        {
          label: 'Access and Timing',
          pathname: collectionsPathHelper(
            collection,
            'settings/access-and-timing'
          ),
        },
        config.enabledFeatures.managers
          ? {
              label: 'Managers',
              pathname: collectionsPathHelper(collection, 'settings/managers'),
            }
          : undefined,
      ].filter(Boolean),
    [collection]
  );

  return (
    <TopTabBar
      className={className}
      currentPathname={currentPathname}
      navigationItems={navigationItems}
    />
  );
};

const EnhancedSettingsNavTabs = React.memo(SettingsNavTabs);

export default EnhancedSettingsNavTabs;
