import React from 'react';
import cx from 'classnames';

const StyledTableHead = ({primary, children}) => (
  <thead
    className={cx(
      'f6 avenir-roman',
      primary ? 'bg-light-aqua' : 'bg-light-gray'
    )}
  >
    {children}
  </thead>
);

const EnhancedStyledTableHead = React.memo(StyledTableHead);

export default EnhancedStyledTableHead;
