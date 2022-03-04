import React from 'react';
import cx from 'classnames';

import MarketplaceTabBarContent from './MarketplaceTabBarContent';
import MarketplaceTabBarContentMobile from './MarketplaceTabBarContentMobile';

const MarketplaceTabBar = ({
  className,
  activePath,
  initialSearchBy,
  marketplaceName,
  navigationLinks,
  profileLinks,
  profileImageElement,
  onSearch,
}) => (
  <nav className={cx('h3 ph3-l bg-white', className)}>
    <MarketplaceTabBarContent
      activePath={activePath}
      initialSearchBy={initialSearchBy}
      marketplaceName={marketplaceName}
      navigationLinks={navigationLinks}
      onSubmitSearchForm={onSearch}
    />
    <MarketplaceTabBarContentMobile
      initialSearchBy={initialSearchBy}
      marketplaceName={marketplaceName}
      navigationLinks={navigationLinks}
      profileLinks={profileLinks}
      profileImageElement={profileImageElement}
      onSubmitSearchForm={onSearch}
    />
  </nav>
);

const EnhancedMarketplaceTabBar = React.memo(MarketplaceTabBar);

export default EnhancedMarketplaceTabBar;
