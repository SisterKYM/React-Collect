import React from 'react';

import {MarketplaceNavigationBar} from './components';
import {profileLinks} from '../../config';
import MarketplaceProfileImageContainer from './MarketplaceProfileImageContainer';

const MarketplaceNavigationBarContainer = () => (
  <MarketplaceNavigationBar
    createSalePath="/collections"
    profileLinks={profileLinks}
    profileImageElement={<MarketplaceProfileImageContainer />}
  />
);

const EnhancedMarketplaceNavigationBarContainer = React.memo(
  MarketplaceNavigationBarContainer
);

export default EnhancedMarketplaceNavigationBarContainer;
