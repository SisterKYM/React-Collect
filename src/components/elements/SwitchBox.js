import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import shortid from 'shortid';

import config from 'config';

const SwitchBox = ({
  id: propId,
  className,
  labelClassName,
  extraSmall,
  small,
  reversed,
  input,
  checked,
  label,
  meta: {touched, error, warning},
  onChange,
  ...props
}) => {
  const id = React.useMemo(() => propId || shortid.generate(), [propId]);

  const knobSize = small ? 16 : 26;

  return (
    <div
      className={cx(
        'flex items-center',
        reversed && 'flex-row-reverse justify-end',
        className
      )}
    >
      <div className="switch-box-switch">
        <input
          {...input}
          className="absolute"
          type="checkbox"
          id={id}
          {...props}
          onChange={event => {
            if (input && input.onChange) {
              input.onChange(event.target.checked);
            }
            if (onChange) {
              onChange(event.target.checked);
            }
          }}
          checked={checked || (Boolean(input) && Boolean(input.value))}
        />
        {/* this label is for faking the form control */}
        <label
          htmlFor={id}
          className="fake-label relative db pointer bg-gray-300"
        />
      </div>
      {/* this label is for display */}
      {label && (
        <label
          htmlFor={id}
          className={cx(
            'pointer',
            reversed ? 'mr3 flex-auto' : 'ml3',
            small ? 'f-small avenir-roman' : 'f-regular',
            checked || (Boolean(input) && Boolean(input.value))
              ? 'dark-grey'
              : 'gray-400',
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      {touched && (error || warning) && (error || warning)}
      <style jsx>{`
        .switch-box-switch {
          min-width: ${knobSize * 1.7}px;
        }
        input {
          left: -9999px;
        }
        input:checked + label {
          background-color: ${config.colors.tint};
        }
        input:checked + label:before {
          left: calc(100% - ${knobSize}px);
        }
        .fake-label {
          height: ${knobSize}px;
          border-radius: ${knobSize / 2}px;
          transition: 0.05s ease-in-out;
        }
        .fake-label:before {
          content: '';
          display: block;
          position: absolute;
          height: ${knobSize}px;
          width: ${knobSize}px;
          top: 0px;
          left: 0px;
          right: auto;
          border-radius: 100%;
          background-color: white;
          transition: 0.05s ease-in-out;
          box-shadow: 0px 1px 4px -1px #37373719;
        }
      `}</style>
    </div>
  );
};

const EnhancedSwitchBox = Object.assign(React.memo(SwitchBox), {
  propTypes: {
    meta: PropTypes.object,
    id: PropTypes.string,
  },
  defaultProps: {
    meta: {},
  },
});

export default EnhancedSwitchBox;
