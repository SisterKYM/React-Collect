import 'react-datepicker/dist/react-datepicker.css';
import {FaCalendar} from 'react-icons/fa';
import cx from 'classnames';
import DatePicker from 'react-datepicker';
import React from 'react';

import {borderWidth, colors, fontFamily, inputHeight} from 'theme/constants';
import {ErrorMessage} from 'elements/Input';
import config from 'config';

const DateInput = ({
  className,
  calendarIconHidden,
  border,
  borderBrand,
  disabled,
  reversed,
  input,
  value,
  onChange,
  meta: {touched, error, warning} = {},
  setValue,
  ...props
}) => {
  const errorMessage = error || warning;
  const errorMessageVisible = errorMessage && touched;

  return (
    <div
      className={cx(
        border && 'ba overflow-hidden',
        borderBrand || errorMessageVisible ? 'b--brand' : 'b--gray-300',
        disabled && 'bg-light-gray',
        className
      )}
    >
      <div
        className={cx(
          !calendarIconHidden && 'flex items-center',
          reversed && 'flex-row-reverse'
        )}
      >
        {!calendarIconHidden && (
          <div className="calendar-icon-wrapper flex ph3 items-center">
            <FaCalendar
              color={errorMessageVisible ? config.colors.brand : colors.gray}
            />
          </div>
        )}
        <DatePicker
          disabled={disabled}
          selected={(input ? input.value : value) || null}
          onChange={input ? input.onChange : onChange}
          {...props}
        />
        <ErrorMessage show={errorMessageVisible} message={errorMessage} />
      </div>
      <style jsx>{`
        .calendar-icon-wrapper {
          height: ${inputHeight}px;
        }
      `}</style>
      <style jsx global>{`
        .react-datepicker-popper {
          min-width: 300px;
        }
        .react-datepicker {
          box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
          border-width: 0px;
          border-color: ${colors.gray};
          border-radius: 5;
          font-family: ${fontFamily};
        }
        .react-datepicker-wrapper,
        .react-datepicker__input-container {
          display: block;
          width: 100%;
        }
        .react-datepicker__header {
          border-color: ${colors.gray};
          background-color: ${config.colors.lightTint};
          padding-top: 1rem;
        }
        .react-datepicker__navigation {
          top: 17px;
        }
        .react-datepicker__input-container input {
          border-radius: 0px;
          border-left-width: 0px;
          border-right-width: 0px;
          border-top-width: 0px;
          border-bottom-width: ${border ? 0 : borderWidth}px;
          border-bottom-style: solid;
          border-bottom-color: ${border ? undefined : colors.gray};
        }
        .react-datepicker__navigation--previous {
          border-right-color: ${config.colors.tint};
        }
        .react-datepicker__navigation--previous:hover {
          border-right-color: ${config.colors.tint};
        }
        .react-datepicker__navigation--next {
          border-left-color: ${config.colors.tint};
        }
        .react-datepicker__navigation--next:hover {
          border-left-color: ${config.colors.tint};
        }
        .react-datepicker__portal .react-datepicker__navigation--previous {
          border-right-color: ${config.colors.tint};
        }
        .react-datepicker__portal
          .react-datepicker__navigation--previous:hover {
          border-right-color: ${config.colors.tint};
        }
        .react-datepicker__portal .react-datepicker__navigation--next {
          border-left-color: ${config.colors.tint};
        }
        .react-datepicker__portal .react-datepicker__navigation--next:hover {
          border-left-color: ${config.colors.tint};
        }
        .react-datepicker__day {
          border-radius: 5;
        }
        .react-datepicker__day:hover {
          background-color: ${colors.gray100};
        }
        .react-datepicker__month {
          margin: 0px;
        }
        .react-datepicker__day--selected {
          color: white;
          background-color: ${config.colors.brand};
        }
        .react-datepicker__day--selected:hover {
          color: white;
          background-color: ${config.colors.brand};
        }
        .react-datepicker__day--today {
          color: ${colors.gray600};
          background-color: ${colors.gray100};
        }
        .react-datepicker__day--today:hover {
          color: ${colors.gray600};
          background-color: ${colors.gray100};
        }
        .react-datepicker-popper[data-placement^='bottom']
          .react-datepicker__triangle {
          border-bottom-color: ${config.colors.lightTint};
        }
        .react-datepicker-popper[data-placement^='bottom']
          .react-datepicker__triangle:before {
          border-bottom-color: ${config.colors.lightTint};
          border-width: 0px;
        }
        .react-datepicker__portal {
          top: unset;
        }
      `}</style>
    </div>
  );
};

const EnhancedDateInput = React.memo(DateInput);

export default EnhancedDateInput;
