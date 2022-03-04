import React from 'react';
import cx from 'classnames';

const MarketplaceHeading = ({className, text}) => (
  <h4 className={cx('i merriweather', className)}>
    {text || 'Internal Marketplace'}{' '}
    <span className="f6 avenir-heavy fs-normal accent">BETA</span>
    <style jsx>{`
      h4 {
        font-size: 0.875rem;
      }
    `}</style>
  </h4>
);

const EnhancedMarketplaceHeading = React.memo(MarketplaceHeading);

export default EnhancedMarketplaceHeading;
