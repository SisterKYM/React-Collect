import React from 'react';
import cx from 'classnames';

import {
  inputHeight as defaultInputHeight,
  inputHeightSmall,
} from 'theme/constants';

import InputErrorMessage from './InputErrorMessage';

const Input = ({
  className,
  autoFocus,
  small,
  style,
  input,
  meta = {},
  overflowVisible,
  border,
  borderShadow,
  borderRadius = true,
  hideErrMsg,
  ...props
}) => {
  const inputRef = React.useRef(null);

  const errorMessage = meta.error || meta.warning;
  const errorMessageDisplayed =
    (meta.touched || meta.submitFailed) && errorMessage;

  React.useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const inputHeight = small
    ? inputHeightSmall - (border ? 2 : 0)
    : defaultInputHeight - (border ? 2 : 0);

  const handleClickError = React.useCallback(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className={cx(
        'relative',
        !overflowVisible && 'overflow-hidden',
        border && 'ba',
        borderRadius && 'br2',
        errorMessage && errorMessageDisplayed ? 'ba b--brand' : 'b--gray-300',
        className
      )}
    >
      <input
        type="text"
        {...input}
        {...props}
        ref={inputRef}
        className={cx('bn', small && 'ph2', small ? 'f-small' : 'f-medium')}
        style={{
          height: inputHeight,
          ...style,
        }}
      />
      <InputErrorMessage
        small={small}
        show={errorMessageDisplayed && !hideErrMsg}
        message={errorMessage}
        onClick={handleClickError}
      />
      <style jsx>{`
        input::placeholder {
          font-family: 'AvenirLTStd-Light', sans-serif;
        }

        .number-dollar-currency input::-webkit-outer-spin-button,
        .number-dollar-currency input::-webkit-inner-spin-button,
        .number-percentage input::-webkit-outer-spin-button,
        .number-percentage input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .number-dollar-currency input,
        .number-percentage input {
          -moz-appearance: textfield;
        }
        .number-dollar-currency {
          position: relative;
          padding-left: 10px;
        }
        .number-dollar-currency:before {
          position: absolute;
          line-height: 36px;
          content: '$';
          left: 8px;
        }
        .number-percentage {
          position: relative;
          padding-left: 12px;
        }

        .number-percentage:before {
          position: absolute;
          line-height: 36px;
          content: '%';
          left: 7px;
        }
      `}</style>
    </div>
  );
};

const EnhancedInput = React.memo(Input);

export default EnhancedInput;
