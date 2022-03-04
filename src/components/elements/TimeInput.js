import 'rc-time-picker/assets/index.css';
import {FaClock} from 'react-icons/fa';
import React from 'react';
import TimePicker from 'rc-time-picker';
import cx from 'classnames';
import moment from 'moment';

import {ErrorMessage} from 'elements/Input';
import {borderWidth, colors, fontFamily, inputHeight} from 'theme/constants';
import config from 'config';

const TimeInput = ({
  className,
  small,
  placeholder,
  disableDefaultValue,
  hideIcon,
  input = {},
  meta: {touched, error, warning} = {},
  value,
  onChange,
}) => (
  <div className={cx('relative overflow-hidden', className)}>
    <div className="flex items-center">
      {!hideIcon && (
        <div className="icon-wrapper flex ph3 items-center bb b--gray-300">
          <FaClock color={colors.gray} />
        </div>
      )}
      <TimePicker
        use12Hours
        inputReadOnly
        className={small ? 'f5' : 'f-regular'}
        showSecond={false}
        placeholder={placeholder}
        defaultValue={
          disableDefaultValue
            ? undefined
            : moment()
                .hour(12)
                .minute(0)
        }
        value={value || input.value}
        onChange={onChange || input.onChange}
      />
    </div>
    <ErrorMessage
      type={error ? 'error' : 'warning'}
      message={error || warning}
      show={touched && (error || warning)}
    />
    <style jsx>{`
      .icon-wrapper {
        height: ${inputHeight}px;
      }
    `}</style>
    <style jsx global>{`
      .rc-time-picker {
        width: 100%;
      }
      .rc-time-picker-panel-inner {
        top: ${inputHeight + 4}px;
        box-shadow: none;
        border-width: 0px;
        line-height: 1.5em;
      }
      .rc-time-picker-panel-input-wrap {
        display: none;
      }
      .rc-time-picker-input,
      .rc-time-picker-panel-input {
        border-color: ${colors.gray};
        line-height: 1.5em;
        height: ${inputHeight}px;
        color: ${colors.gray600};
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0px;
        padding-bottom: 0px;
        font-size: 1rem;
      }
      .rc-time-picker-input {
        border-radius: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-top-width: 0px;
      }
      .rc-time-picker-panel-input {
        position: relative;
        top: 2px;
        border-top-width: ${borderWidth}px;
        border-bottom-width: ${borderWidth}px;
        border-left-width: 0px;
        border-right-width: 0px;
        font-family: ${fontFamily};
      }
      .rc-time-picker-clear-icon {
        display: none;
      }
      .rc-time-picker-panel-select {
        flex-grow: 1;
        border-color: ${colors.gray};
        font-size: 1rem;
      }
      .rc-time-picker-panel-select li {
        padding-left: 0px;
        text-align: center;
        line-height: 1.5em;
        height: auto;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .rc-time-picker-panel-select li:hover {
        color: ${config.colors.tint};
        background-color: ${config.colors.lightTint};
      }
      li.rc-time-picker-panel-select-option-selected {
        color: ${config.colors.tint};
        background-color: ${config.colors.lightTint};
      }
      .rc-time-picker-panel-combobox {
        display: flex;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      }
    `}</style>
  </div>
);

const EnhancedTimeInput = React.memo(TimeInput);

export default EnhancedTimeInput;
