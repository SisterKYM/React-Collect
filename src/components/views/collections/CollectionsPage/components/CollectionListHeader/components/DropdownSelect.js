import {FiDownload} from 'react-icons/fi';
import {FaSortDown} from 'react-icons/fa';
import React from 'react';
import cx from 'classnames';

import Dropdown from 'elements/Dropdown';

const DropdownSelect = ({
  className,
  hideArrow,
  backgroundColor,
  borderColor = '#D8DCE6',
  title,
  options,
  dropdownProps,
  newExportBtn,
  customBody,
  width,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleToggleDropdownOpen = React.useCallback((event) => {
    event.stopPropagation();

    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleDismissDropdown = React.useCallback((event) => {
    if (event) {
      event.stopPropagation();
    }

    setOpen(false);
  }, []);

  const renderOption = React.useCallback((option) => {
    const handleClick = (event) => {
      event.stopPropagation();

      if (option.onClick) {
        option.onClick();
      }

      setOpen(false);
    };

    return (
      <div
        key={option.title}
        className={cx('pointer dropdown-option', option.className)}
        onClick={handleClick}
      >
        {option.title}
      </div>
    );
  }, []);

  return (
    <>
      <div
        className={cx(
          'pointer relative text-12 avenir-roman',
          !hideArrow && 'ph3 br2',
          newExportBtn && 'ph3 bh-light-gray br2 ba b--gray-300',
          className
        )}
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor,
          width,
        }}
        onClick={handleToggleDropdownOpen}
      >
        {newExportBtn && (
          <FiDownload
            className="gray"
            style={{position: 'relative', top: 2}}
            size={14}
          />
        )}
        <span className="avenir-roman dark-grey">{title}</span>
        {!hideArrow && (
          <FaSortDown
            className="dark-grey"
            size={14}
            style={{
              position: 'absolute',
              right: '10px',
              top: '4px',
            }}
          />
        )}
      </div>
      <Dropdown
        border
        top={10}
        width="100%"
        backgroundColor={backgroundColor || 'gray'}
        borderRadius
        className="dark-grey"
        open={open}
        onDismiss={handleDismissDropdown}
        body={
          <div className="pa3 avenir-light text-14">
            {customBody}
            {options.map((x) => renderOption(x))}
          </div>
        }
        {...dropdownProps}
      />
      <style jsx>{`
        :global(.dropdown-option) {
          margin-bottom: 1rem;
        }
        :global(.dropdown-option:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};

const EnhancedDropdownSelect = React.memo(DropdownSelect);

export default EnhancedDropdownSelect;
