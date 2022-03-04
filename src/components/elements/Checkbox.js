import React, {useMemo} from 'react';
import cx from 'classnames';
import shortid from 'shortid';

import CheckMark from 'theme/images/CheckMarkWhite.svg';
import config from 'config';

const Checkbox = ({
  className,
  labelClassName,
  labelStyle,
  disabled,
  inactive,
  isRadio,
  label,
  input,
  backgroundColorSet = false,
  alignStart = false,
  meta: {touched, error, warning} = {},
  checkedOnValue,
  onClick,
  onChange,
  small,
  ...props
}) => {
  const id = useMemo(() => props.id || shortid.generate(), [props.id]);
  const SIZE = small ? 14 : 16;

  return (
    <div
      className={cx(
        'flex',
        alignStart ? 'items-start' : 'items-center',
        className
      )}
      onClick={onClick}
    >
      <div className="checkbox-container relative mb1">
        <input
          className="absolute"
          type={isRadio ? 'radio' : 'checkbox'}
          name={id}
          {...(input || {})}
          checked={
            checkedOnValue
              ? Boolean(input) && Boolean(input.value)
              : Boolean(input) && input.checked
          }
          {...props}
          id={id}
          disabled={inactive || disabled}
          onChange={onChange || (input && input.onChange)}
        />
        {/* this label is for faking the form control */}
        <label
          className={cx(
            'fake-label absolute bg-white ba b--gray-300 br2',
            disabled ? 'bg-gray-300' : !inactive && 'pointer',
            labelClassName
          )}
          htmlFor={id}
        />
      </div>
      {/* this label is for display */}
      {label && (
        <label
          className={cx(
            'lh-solid avenir-light gray-600 pointer checkbox-label',
            labelClassName
          )}
          style={labelStyle}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {touched && (error || warning) && (
        <span className="ml1 brand">{error || warning}</span>
      )}
      <style jsx>{`
        .checkbox-container {
          width: ${SIZE}px;
          height: ${SIZE}px;
        }
        .checkbox-label {
          display: block;
          width: calc(100% - ${SIZE * 1.75}px);
          text-overflow: ellipsis;
          overflow: hidden;
          margin-left: 12px;
          margin-right: 12px;
          font-size: ${SIZE}px;
          line-height: ${SIZE * 1.25}px;
        }
        input {
          visibility: hidden;
        }
        input:checked + label {
          background-image: url(${CheckMark});
          background-repeat: no-repeat;
          background-position: center;
          ${backgroundColorSet
            ? ''
            : `background-color: ${config.colors.tint};`}
        }
        .fake-label {
          width: ${SIZE}px;
          height: ${SIZE}px;
        }
      `}</style>
    </div>
  );
};

const EnhancedCheckbox = React.memo(Checkbox);

export default EnhancedCheckbox;
