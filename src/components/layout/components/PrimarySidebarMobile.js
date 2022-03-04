import React from 'react';
import cx from 'classnames';

const height = 70;

const PrimarySidebarMobile = ({className, nav}) => (
  <div
    className={cx(
      'flex w-100 justify-center items-center overflow-hidden bg-accent',
      className
    )}
  >
    {React.cloneElement(nav, {column: false})}
    <style jsx>{`
      div {
        height: ${height}px;
      }
    `}</style>
  </div>
);

const EnhancedPrimarySidebarMobile = React.memo(PrimarySidebarMobile);

export {height};
export default EnhancedPrimarySidebarMobile;
