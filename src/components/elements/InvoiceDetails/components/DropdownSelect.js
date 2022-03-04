import {FiDownload} from 'react-icons/fi';
import {FaSortDown} from 'react-icons/fa';
import React, {useCallback, useState} from 'react';
import cx from 'classnames';

import Dropdown from 'elements/Dropdown';

const dropdownStyle = {
  padding: '10px 12px',
};
const dropdownBodyStyle = {
  padding: '20px 12px',
};

const DropdownSelect = ({
  className,
  hideArrow,
  backgroundColor,
  title,
  options,
  dropdownProps,
  newExportBtn,
}) => {
  const [open, setOpen] = useState(false);

  const handleToggleDropdownOpen = useCallback((event) => {
    event.stopPropagation();

    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleDismissDropdown = useCallback((event) => {
    if (event) {
      event.stopPropagation();
    }

    setOpen(false);
  }, []);

  const renderOption = useCallback((option, idx) => {
    const handleClick = (event) => {
      event.stopPropagation();

      if (option.onClick) {
        option.onClick();
      }

      setOpen(false);
    };

    return (
      <div
        key={option.value}
        className={cx('text-14 avenir-roman', idx !== 0 && 'mt3')}
        onClick={handleClick}
      >
        {option.title}
      </div>
    );
  }, []);

  return (
    <div
      className={cx(
        'pointer',
        !hideArrow && 'bg-light-gray br2',
        newExportBtn && 'bh-light-gray br2 ba b--gray-300',
        className
      )}
      style={dropdownStyle}
      onClick={handleToggleDropdownOpen}
    >
      {newExportBtn && (
        <FiDownload
          className="dark-grey"
          style={{position: 'relative', top: 2}}
          size={14}
        />
      )}
      <span className="mr3 text-14 avenir-roman dark-grey">{title}</span>
      {!hideArrow && <FaSortDown className="dark-grey" size={14} />}
      <Dropdown
        border
        width={200}
        backgroundColor={backgroundColor || 'gray'}
        color="darkerGray"
        open={open}
        onDismiss={handleDismissDropdown}
        body={
          <div style={dropdownBodyStyle}>
            {options.map((x, idx) => renderOption(x, idx))}
          </div>
        }
        {...dropdownProps}
      />
    </div>
  );
};

const EnhancedDropdownSelect = React.memo(DropdownSelect);

export default EnhancedDropdownSelect;
