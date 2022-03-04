import * as React from 'react';
import cx from 'classnames';

const InputLabel = ({className, htmlFor, required, label, children}) =>
  label ? (
    <label className={cx('f6 avenir-roman', className)} htmlFor={htmlFor}>
      <span className="db mb2 gray-600">
        <span style={{lineHeight: '20px'}}>{label}</span>
        {required && <span className="brand"> *</span>}
      </span>
      {children}
    </label>
  ) : (
    <div className={cx('relative', className)}>{children}</div>
  );

const EnhancedInputLabel = React.memo(InputLabel);

export default EnhancedInputLabel;
