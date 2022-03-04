import React from 'react';
import cx from 'classnames';

const StyledTableCell = ({className, children}) => (
  <td className={cx('pa3 nowrap bb b--gray-300', className)}>{children}</td>
);

const EnhancedStyledTableCell = React.memo(StyledTableCell);

export default EnhancedStyledTableCell;
