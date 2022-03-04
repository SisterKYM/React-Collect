import {useSelector} from 'react-redux';
import React from 'react';

import {MarketplaceTabBar} from './components';
import {getNavigationLinks, profileLinks} from '../../config';
import MarketplaceProfileImageContainer from './MarketplaceProfileImageContainer';

const MarketplaceTabBarContainer = ({
  activePath,
  initialSearchBy,
  onSearch,
}) => {
  const organizationData = useSelector((state) =>
    state.session.organization_data ? state.session.organization_data : null
  );

  const marketplaceName =
    organizationData?.internalMarketplace?.organizerNickname || '';
  const navigationLinks = React.useMemo(
    () => getNavigationLinks({marketplaceName}),
    [marketplaceName]
  );

  return (
    <MarketplaceTabBar
      activePath={activePath}
      initialSearchBy={initialSearchBy}
      marketplaceName={marketplaceName}
      navigationLinks={navigationLinks}
      profileLinks={profileLinks}
      profileImageElement={<MarketplaceProfileImageContainer />}
      onSearch={onSearch}
    />
  );
};

const EnhancedMarketplaceTabBarContainer = React.memo(
  MarketplaceTabBarContainer
);

export default EnhancedMarketplaceTabBarContainer;
