import React from 'react';
import cx from 'classnames';

const PageTitle = ({className, children, ...props}) => (
  <h1 className={cx('pt2 mt4 mb3', className)} {...props}>
    {children}
  </h1>
);

const EnhancedPageTitle = React.memo(PageTitle);

export default EnhancedPageTitle;
