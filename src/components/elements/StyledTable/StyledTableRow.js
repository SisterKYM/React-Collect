import React from 'react';
import cx from 'classnames';

const StyledTableRow = ({'data-id': dataId, head, children, className}) => (
  <tr
    data-id={dataId}
    className={cx(head ? 'items-center tl' : 'lh-copy avenir-light', className)}
  >
    {children}
  </tr>
);

const EnhancedStyledTableRow = React.memo(StyledTableRow);

export default EnhancedStyledTableRow;
