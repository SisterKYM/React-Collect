import React from 'react';
import cx from 'classnames';

import Status from 'elements/Status';

const CommonButton = ({
  className,
  style,
  type,
  disabled,
  status,
  children,
  onClick,
}) => (
  <button
    className={cx(
      'flex justify-center items-center',
      'br2',
      disabled ? 'not-allowed bg-gray-250' : 'pointer',
      className
    )}
    style={style}
    type={type}
    disabled={disabled || status === 'pending'}
    onClick={onClick}
  >
    {status === 'pending' ? ( // todo: add icon
      <Status status="pending" />
    ) : (
      children
    )}
    <style jsx>{`
      button:active {
        box-shadow: none;
      }
      button {
        border: 1px solid transparent;
        line-height: 20px;
      }
      .pt-12 {
        font-size: 12px;
        font-family: 'AvenirLTStd-Roman', sans-serif;
        padding: 4px 16px;
      }
      .pt-14 {
        font-size: 14px;
        font-family: 'AvenirLTStd-Roman', sans-serif;
        padding: 7px 21px;
      }
      .pt-16 {
        font-size: 16px;
        font-family: 'AvenirLTStd-Light', sans-serif;
        padding: 9px 24px;
      }
      .pt-18 {
        font-size: 18px;
        font-family: 'AvenirLTStd-Light', sans-serif;
        padding: 12px 27px 13px;
      }
    `}</style>
  </button>
);

const EnhancedCommonButton = React.memo(CommonButton);

export default EnhancedCommonButton;
