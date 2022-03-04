import React from 'react';
import cx from 'classnames';

import {ReactComponent as DefaultAvatar} from 'theme/images/DefaultAvatar.svg';
import ImagesUtils from 'helpers/ImagesUtils';

const ProfileImage = ({className, imageUrl}) =>
  imageUrl ? (
    <img
      className={cx('br-100', className)}
      alt="Profile avatar"
      src={ImagesUtils.getCroppedImageUrl(imageUrl, {
        width: 180,
        height: 180,
      })}
    />
  ) : (
    <DefaultAvatar className={className} />
  );

const EnhancedProfileImage = React.memo(ProfileImage);

export default EnhancedProfileImage;
