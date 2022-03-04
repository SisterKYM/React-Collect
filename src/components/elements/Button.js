import React from 'react';
import cx from 'classnames';

import {inputHeight, inputHeightSmall} from 'theme/constants';
import Status from 'elements/Status';

const Button = ({
  className,
  style,
  type,
  disabled,
  small,
  medium,
  fontFamilySet = false,
  heightSet = false,
  colorSet = false,
  backgroundColorSet = false,
  fontSizeSet = false,
  borderRadius = true,
  status,
  children,
  onClick,
}) => (
  <button
    className={cx(
      borderRadius && 'br2',
      !fontFamilySet && small && 'avenir-roman',
      !fontFamilySet && !small && 'avenir-light',
      !fontSizeSet && small && 'f6',
      !fontSizeSet && !small && 'f-regular',
      !colorSet && 'white',
      !backgroundColorSet && !disabled && 'bg-tint',
      medium && 'pa30',
      disabled ? 'not-allowed bg-grey' : 'pointer',
      className
    )}
    style={{
      height: heightSet ? undefined : small ? inputHeightSmall : inputHeight,
      ...style,
    }}
    type={type}
    disabled={disabled || status === 'pending'}
    onClick={onClick}
  >
    {status === 'pending' ? (
      <div className="flex justify-center items-center">
        <Status status="pending" />
      </div>
    ) : (
      children
    )}
    <style jsx>{`
      button:active {
        box-shadow: none;
      }
      .pa30 {
        padding: 10px 30px;
      }
      .pa16 {
        padding: 10px 16px;
      }
    `}</style>
  </button>
);

const EnhancedButton = React.memo(Button);

export default EnhancedButton;
