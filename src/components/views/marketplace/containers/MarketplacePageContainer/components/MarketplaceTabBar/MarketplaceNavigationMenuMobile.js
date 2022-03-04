import React from 'react';
import cx from 'classnames';
import useOnClickOutside from 'use-onclickoutside';

import {LinksMenu} from '../../../../components';

const MarketplaceNavigationMenuMobile = ({
  className,
  navigationLinks,
  profileImageElement,
  profileLinks,
  onDismiss,
}) => {
  const containerRef = React.useRef(null);

  useOnClickOutside(containerRef, onDismiss);

  return (
    <div ref={containerRef} className={cx('ba b--gray-300', className)}>
      <LinksMenu
        className="pa3 bb b--gray-300 bg-white"
        links={navigationLinks}
      />
      <div className="pa3 bg-gray-300">
        {profileImageElement}
        <LinksMenu
          className={cx(
            'bb b--gray-300',
            Boolean(profileImageElement) && 'mt2'
          )}
          links={profileLinks}
        />
      </div>
    </div>
  );
};

const EnhancedMarketplaceNavigationMenuMobile = React.memo(
  MarketplaceNavigationMenuMobile
);

export default EnhancedMarketplaceNavigationMenuMobile;
