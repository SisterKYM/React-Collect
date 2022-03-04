import React from 'react';
import cx from 'classnames';
import shortid from 'shortid';

import {colors} from 'theme/constants';
import CheckMarkWhite from 'theme/images/CheckMarkWhite.svg';

const DEFAULT_SIZE = 25;

const BigCheckbox = ({
  className,
  labelClassName,
  labelFontSizeSet,
  labelColorSet,
  label,
  input = {},
  size,
  square = false,
  meta = {},
  type = 'radio',
  id,
  checked,
  ...props
}) => {
  const labelSize = size || DEFAULT_SIZE;
  const errMsg = meta.error || meta.warning;
  const inputId = React.useMemo(() => id || shortid.generate(), [id]);

  return (
    <div className={cx('flex items-center', className)}>
      <input
        className="absolute"
        id={inputId}
        type={type}
        checked={checked}
        {...props}
        {...input}
      />
      {/* this label is for faking the form control */}
      <label
        className={cx(
          'fake-label relative db ba b--gray-300 pointer bg-white',
          !square && 'br-100',
          labelClassName
        )}
        style={{
          height: labelSize,
          width: labelSize,
          minWidth: labelSize,
        }}
        htmlFor={inputId}
      />
      {/* this label is for display */}
      {label && (
        <label
          className={cx(
            'ml3 pointer',
            !labelColorSet && !((input && input.checked) || checked)
              ? 'medium-grey'
              : 'gray-600',
            !labelFontSizeSet && 'f-regular',
            size === 22 && 'f-normal',
            labelClassName
          )}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {meta.touched && errMsg && <div className="ml3 f7 brand">{errMsg}</div>}
      <style jsx>{`
        input {
          left: -9999px;
        }
        input:checked + label {
          border-color: ${colors.primary};
          background-repeat: no-repeat;
          background-color: ${colors.primary};
          background-image: url(${CheckMarkWhite});
          background-position: center;
        }
        .fake-label {
          text-indent: -9999px;
        }
      `}</style>
    </div>
  );
};

const EnhancedBigCheckbox = Object.assign(React.memo(BigCheckbox), {
  size: DEFAULT_SIZE,
});

export default EnhancedBigCheckbox;
