import {useSelector} from 'react-redux';
import React from 'react';

import {ProfileImage} from 'elements';

const MarketplaceProfileImageContainer = () => {
  const profileImageUrl = useSelector(state => state.session.user.profile_pic);

  return <ProfileImage className="w2" imageUrl={profileImageUrl} />;
};

const EnhancedMarketplaceProfileImageContainer = React.memo(
  MarketplaceProfileImageContainer
);

export default EnhancedMarketplaceProfileImageContainer;
