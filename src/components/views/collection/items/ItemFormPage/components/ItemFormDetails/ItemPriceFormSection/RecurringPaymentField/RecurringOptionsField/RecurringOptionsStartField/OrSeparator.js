import React from 'react';
import cx from 'classnames';

const OrSeparator = ({className}) => (
  <div className={cx('self-stretch flex flex-column items-center', className)}>
    <div className="or-separator-line flex-auto mb2 bg-gray-400" />
    OR
    <div className="or-separator-line flex-auto mt2 bg-gray-400" />
    <style jsx>{`
      .or-separator-line {
        width: 1px;
      }
    `}</style>
  </div>
);

const EnhancedOrSeparator = React.memo(OrSeparator);

export default EnhancedOrSeparator;
