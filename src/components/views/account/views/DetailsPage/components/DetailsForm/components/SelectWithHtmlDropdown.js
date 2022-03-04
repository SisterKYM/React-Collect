import React, {useCallback, useEffect, useMemo, useState} from 'react';
import cx from 'classnames';
import {FaSortDown} from 'react-icons/fa';

import {Dropdown} from 'elements';
import {ErrorMessage} from 'elements/Input';
import config from 'config';

const faSortDownStyle = {
  position: 'absolute',
  right: '21px',
  top: '2px',
};

const SelectWithHtmlDropdown = ({
  className,
  disabled,
  onInput,
  options,
  style,
  value,
}) => {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const handleToggleDropdown = useCallback(
    (event) => {
      event.stopPropagation();
      setOpen((prev) => !disabled && !prev);
    },
    [disabled]
  );

  const handleDismissDropdown = useCallback((event) => {
    if (event) {
      event.stopPropagation();
    }

    setOpen(false);
  }, []);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) || {},
    [options, value]
  );

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();

      onInput(options[e.currentTarget.getAttribute('data-id')].value);
      setOpen(false);
    },
    [onInput, options]
  );

  useEffect(() => {
    if (open && !touched) {
      setTouched(true);
    }
  }, [open, touched]);

  const renderOption = useCallback(
    (option, i) => (
      <div
        key={option.value}
        data-id={i}
        className={cx('dropdown-option pointer', option.className)}
        onClick={handleClick}
      >
        {option.title}
        {option.comment}
        <style jsx>{`
          .dropdown-option {
            margin-bottom: 1.4rem;
            letter-spacing: 0.15px;
          }
          .dropdown-option:last-child {
            margin-bottom: 0;
          }
        `}</style>
      </div>
    ),
    [handleClick]
  );

  const showErrorMessage = !open && touched && !selectedOption?.title;

  const wrapperStyle = useMemo(
    () => ({
      ...style,
      ...(showErrorMessage ? {borderColor: config.colors.brand} : {}),
    }),
    [showErrorMessage, style]
  );

  return (
    <>
      <div
        className={cx('relative', className, disabled ? 'disabled' : 'pointer')}
        onClick={handleToggleDropdown}
        style={wrapperStyle}
      >
        {selectedOption?.title}
        {<FaSortDown className="dark-grey" size={20} style={faSortDownStyle} />}
        <ErrorMessage show={showErrorMessage} message="Required" />
      </div>
      <Dropdown
        border
        top={-16}
        width="100%"
        borderRadius
        className="gray-550"
        open={open}
        onDismiss={handleDismissDropdown}
        body={<div className="pa3 text-14">{options.map(renderOption)}</div>}
      />
      <style jsx>{`
        .disabled {
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

const EnhancedSelectWithHtmlDropdown = React.memo(SelectWithHtmlDropdown);

export default EnhancedSelectWithHtmlDropdown;
