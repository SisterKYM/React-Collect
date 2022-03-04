import {IoIosArrowDown, IoMdAlert} from 'react-icons/io';
import React from 'react';
import _ from 'lodash';

import {ReactComponent as DefaultAvatar} from 'theme/images/DefaultAvatar.svg';
import Button from 'elements/Button';
import ImagesUtils from 'helpers/ImagesUtils';
import config from 'config';
import cx from 'classnames';

const AvatarButtonMenu = ({className, heightFlexible, user, alertVisible}) => {
  const profilePicUrl = _.get(user, 'profile_pic');

  return (
    <Button
      colorSet
      backgroundColorSet
      className={cx('gray-600 bg-white', className)}
      heightSet={heightFlexible}
    >
      <div className="flex items-center">
        {profilePicUrl ? (
          <div className="avatar-icon avatar relative mr1 br-100 cover">
            {alertVisible && <IoMdAlert className="alert absolute brand" />}
          </div>
        ) : (
          <div className="relative mr1">
            <DefaultAvatar
              className="avatar-icon"
              fill={config.colors.lightTint}
            />
            {alertVisible && <IoMdAlert className="alert absolute brand" />}
          </div>
        )}
        <style jsx>{`
        :global(.alert) {
          top: -5px;
          right: -7px;
        }
        :global(.avatar-icon) {
          width: 1.875rem;
          height: 1.875rem;
        }
        :global(.avatar) {
          background-image: url("${
            profilePicUrl ? ImagesUtils.getCroppedImageUrl(profilePicUrl) : null
          }");
        }
      `}</style>
        <IoIosArrowDown className="f6" />
      </div>
    </Button>
  );
};

const EnhancedAvatarButtonMenu = React.memo(AvatarButtonMenu);

export default EnhancedAvatarButtonMenu;
