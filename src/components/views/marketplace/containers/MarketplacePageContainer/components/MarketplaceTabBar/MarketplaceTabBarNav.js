import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import config from 'config';

const MarketplaceTabBarNav = ({className, activePath, navigationLinks}) => {
  const tabClassName = 'inline-flex h-100 items-center';

  return (
    <div className={cx('cf mw6 h-100 f-small avenir-medium nowrap', className)}>
      {navigationLinks.map(navigationLink => (
        <Link
          key={navigationLink.to}
          className="fl w-third h-100 tc gray-600"
          to={navigationLink.to}
        >
          <span
            className={cx(
              tabClassName,
              navigationLink.to === activePath && 'active-tab'
            )}
          >
            {navigationLink.title}
          </span>
        </Link>
      ))}
      <style jsx>{`
        .active-tab,
        span:hover {
          padding-top: 0.25rem;
          border-bottom-width: 0.25rem;
          border-bottom-color: ${config.colors.brand};
          border-bottom-style: solid;
        }
      `}</style>
    </div>
  );
};

const EnhancedMarketplaceTabBarNav = React.memo(MarketplaceTabBarNav);

export default EnhancedMarketplaceTabBarNav;
