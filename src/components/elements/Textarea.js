import React from 'react';
import cx from 'classnames';

const Textarea = ({
  className,
  border,
  input,
  meta = {},
  styleWrap = {},
  ...props
}) => {
  const errMsg = meta.error || meta.warning;
  const showErrMsg = meta.touched && errMsg;

  return (
    <span className="relative" style={styleWrap}>
      <textarea
        className={cx(border && 'ba b--gray-300', className)}
        {...input}
        {...props}
      />
      {showErrMsg && (
        <div className="textarea-error-message absolute right-0 f7 brand">
          {errMsg}
          <style jsx>{`
            .textarea-error-message {
              top: 21px;
            }
          `}</style>
        </div>
      )}
    </span>
  );
};

const EnhancedTextarea = React.memo(Textarea);

export default EnhancedTextarea;
