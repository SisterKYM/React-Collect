import React from 'react';
import cx from 'classnames';

import SocialFacebookIcon from 'theme/images/social-facebook-icon.svg';
import SocialMailIcon from 'theme/images/social-mail-icon.svg';
import SocialTwitterIcon from 'theme/images/social-twitter-icon.svg';

const CollectionShare = ({className, shareUrls}) => (
  <div
    className={cx('collection-share-container flex justify-between', className)}
  >
    <a
      className="flex dim"
      rel="noopener noreferrer"
      target="_blank"
      href={shareUrls.facebook}
    >
      <img alt="facebook" src={SocialFacebookIcon} />
    </a>
    <a
      className="flex dim"
      rel="noopener noreferrer"
      target="_blank"
      href={shareUrls.twitter}
    >
      <img alt="twitter" src={SocialTwitterIcon} />
    </a>
    <a
      className="flex dim"
      rel="noopener noreferrer"
      target="_blank"
      href={shareUrls.mail}
    >
      <img alt="mail" src={SocialMailIcon} />
    </a>
    <style jsx>{`
      .collection-share-container {
        width: 9rem;
      }
    `}</style>
  </div>
);

const EnhancedCollectionShare = React.memo(CollectionShare);

export default EnhancedCollectionShare;
