import {FaTimesCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import React from 'react';

import {ReactComponent as ProfileImageIcon} from 'theme/images/ProfileImage.svg';
import ImagesUtils from 'helpers/ImagesUtils';
import config from 'config';

const ProfilePicture = ({onDelete, picture}) => (
  <Link to="/user/profile/picture">
    <div className="profile-picture-wrapper relative pointer">
      {picture ? (
        <>
          <div
            className="relative profile-picture cover"
            style={{
              backgroundImage: `url("${ImagesUtils.getCroppedImageUrl(
                picture
              )}")`,
              borderRadius: '100%',
            }}
          />
          <FaTimesCircle
            className="close-icon absolute top-0 right-0 pointer"
            onClick={(event) => {
              event.preventDefault();

              onDelete();
            }}
          />
        </>
      ) : (
        <ProfileImageIcon className="profile-picture profile-image-fill-color" />
      )}
    </div>
    <style jsx>{`
      .profile-picture-wrapper {
        width: 6.875rem;
        height: 6.875rem;
      }
      :global(.profile-picture) {
        width: 7.5rem;
        height: 7.5rem;
      }
      :global(.close-icon) {
        margin-right: -2.5rem;
      }
    `}</style>
  </Link>
);

const EnhancedProfilePicture = React.memo(ProfilePicture);

export default EnhancedProfilePicture;
