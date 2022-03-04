import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import {Logo} from 'elements';

import {LinksMenu} from '../../../components';

const MarketplaceNavigationBar = ({
  className,
  createSalePath,
  profileLinks,
  profileImageElement,
}) => {
  const [profileMenuVisible, setProfileMenuVisible] = React.useState(false);

  const handleClickProfileImage = React.useCallback(() => {
    setProfileMenuVisible(true);
  }, []);

  const handleDismissLinksMenu = React.useCallback(() => {
    setProfileMenuVisible(false);
  }, []);

  return (
    <>
      <header
        className={cx(
          'h3 ph3 flex items-center justify-center justify-between-l bg-white',
          className
        )}
      >
        <Link className="flex" to="/collections">
          <Logo forceWordmarkVisible className="mr3" />
        </Link>
        <div className="dn flex-l items-center">
          <Link className="mr3 f-small avenir-roman" to={createSalePath}>
            Create a Sale
          </Link>
          <div className="pointer" onClick={handleClickProfileImage}>
            {profileImageElement}
          </div>
        </div>
      </header>
      {profileMenuVisible && (
        <div className="relative z-999">
          <LinksMenu
            className="absolute top-0 right-1 w5 pa3 ba b--gray-300 bg-white z-1"
            links={profileLinks}
            onDismiss={handleDismissLinksMenu}
          />
        </div>
      )}
    </>
  );
};

const EnhancedMarketplaceNavigationBar = React.memo(MarketplaceNavigationBar);

export default EnhancedMarketplaceNavigationBar;
