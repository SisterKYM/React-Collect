import React from 'react';
import cx from 'classnames';

const StyledTableHeadCell = ({className, children}) => (
  <td className={cx('ph3 pv2', className)}>{children}</td>
);

const EnhancedStyledTableHeadCell = React.memo(StyledTableHeadCell);

export default EnhancedStyledTableHeadCell;
