import React from 'react';
import cx from 'classnames';

const MarketplaceSectionTitle = ({className, children}) => (
  <>
    <h5 className={cx('avenir-roman', className)}>{children}</h5>
    <style jsx>{`
      h5 {
        font-size: 1.3125rem;
      }
    `}</style>
  </>
);

const EnhancedMarketplaceSectionTitle = React.memo(MarketplaceSectionTitle);

export default EnhancedMarketplaceSectionTitle;
