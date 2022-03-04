import React from 'react';

import {collectionsPathHelper} from 'helpers';
import {TopTabBar} from 'elements';
import config from 'config';

const ShareNavTabs = ({className, currentPathname, collection}) => {
  const navigationItems = React.useMemo(
    () =>
      [
        {
          label: 'Your Link',
          pathname: collectionsPathHelper(collection, `share/link`),
        },
        {
          label: 'Invitations',
          pathname: collectionsPathHelper(collection, `share/invitations`),
        },
        config.enabledFeatures.siteButtons
          ? {
              label: 'Website Button',
              pathname: collectionsPathHelper(
                collection,
                `share/website-button`
              ),
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

const EnhancedShareNavTabs = React.memo(ShareNavTabs);

export default EnhancedShareNavTabs;
