import React from 'react';
import cx from 'classnames';

const MarketplacePageContentContainer = ({className, children}) => (
  <div
    className={cx(
      'marketplace-page-content-container w-90 w-80-ns pv4 center',
      className
    )}
  >
    {children}
    <style jsx>{`
      .marketplace-page-content-container {
        max-width: 56rem;
      }
    `}</style>
  </div>
);

const EnhancedMarketplacePageContentContainer = React.memo(
  MarketplacePageContentContainer
);

export default EnhancedMarketplacePageContentContainer;
