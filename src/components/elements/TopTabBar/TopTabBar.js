import React from 'react';
import cx from 'classnames';

import TopTabBarItem from './TopTabBarItem';

const TopTabBar = ({
  className,
  forceDesktopStyling,
  navigationItems,
  currentPathname,
}) => (
  <nav
    className={cx(
      'w-100 flex bb b--gray-300',
      forceDesktopStyling
        ? 'h3 br2 mb3'
        : 'h-100 h3-ns flex-column flex-row-ns br2-ns mb3-ns',
      className
    )}
  >
    {navigationItems.map((navigationItem) => (
      <TopTabBarItem
        key={navigationItem.pathname}
        forceDesktopStyling={forceDesktopStyling}
        active={currentPathname === navigationItem.pathname}
        label={navigationItem.label}
        to={navigationItem.pathname}
      />
    ))}
  </nav>
);

const EnhancedTopTabBar = React.memo(TopTabBar);

export default EnhancedTopTabBar;
