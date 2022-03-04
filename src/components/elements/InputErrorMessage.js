import cx from 'classnames';
import React from 'react';

const InputErrorMessage = ({className, children}) => (
  <div className={cx('avenir-roman truncate brand', className)}>{children}</div>
);

export default InputErrorMessage;
