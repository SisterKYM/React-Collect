import React from 'react';
import cx from 'classnames';

const StyledTable = ({className, children}) => (
  <div className={cx('overflow-auto', className)}>
    <table className="w-100">{children}</table>
  </div>
);

const EnhancedStyledTable = React.memo(StyledTable);

export default EnhancedStyledTable;
