import React from 'react';
import cx from 'classnames';

const TableCell = ({leading, trailing, title}) => (
  <td className={cx('pv2', leading && 'pl2', trailing && 'pr2')}>{title}</td>
);

const EnhancedTableCell = React.memo(TableCell);

export default EnhancedTableCell;
