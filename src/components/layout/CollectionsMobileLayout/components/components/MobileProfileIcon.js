import React from 'react';
import {useSelector} from 'react-redux';

import ImagesUtils from 'helpers/ImagesUtils';
import {ReactComponent as MobileAvatar} from 'theme/images/MobileAvatar.svg';

const MobileProfileIcon = ({className}) => {
  const profilePicUrl = useSelector(
    (state) => state.session?.user?.profile_pic
  );

  return (
    <div className={className}>
      {profilePicUrl ? (
        <div className="mobile-profile-icon avatar" />
      ) : (
        <MobileAvatar className="db" />
      )}
      <style>{`
        .mobile-profile-icon {
          padding-bottom: 100%;
          border-radius: 50%;
        }
        .mobile-profile-icon.avatar {
          background-image: url("${
            profilePicUrl ? ImagesUtils.getCroppedImageUrl(profilePicUrl) : null
          }");
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </div>
  );
};

const EnhancedMobileProfileIcon = React.memo(MobileProfileIcon);

export default EnhancedMobileProfileIcon;
