import {FiDownload} from 'react-icons/fi';
import {FaSortDown} from 'react-icons/fa';
import React from 'react';
import cx from 'classnames';

import {scale} from 'theme/constants';
import Dropdown from 'elements/Dropdown';

const DropdownSelect = ({
  className,
  style,
  hideArrow,
  rightArrow,
  backgroundColor,
  title,
  titleClassName,
  options,
  dropdownProps,
  newExportBtn,
  onClick,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = React.useCallback(
    (event) => {
      event.stopPropagation();

      setOpen((prevOpen) => !prevOpen);

      if (onClick) {
        onClick();
      }
    },
    [onClick]
  );

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
        className={cx('f7 avenir-roman pv2', option.className)}
        onClick={handleClick}
      >
        {option.title}
        {option.comment}
      </div>
    );
  }, []);

  return (
    <div
      className={cx(
        'pointer',
        !hideArrow && 'ph3 bg-light-gray br2',
        newExportBtn && 'ph3 bh-light-gray br2 ba b--gray-300',
        className
      )}
      style={{
        paddingTop: 5,
        paddingBottom: 4,
        ...style,
      }}
      onClick={handleClick}
    >
      {newExportBtn && (
        <FiDownload
          className="dark-grey"
          style={{position: 'relative', top: 2}}
          size={14}
        />
      )}
      <span className={cx('ml2 mr3 f7 avenir-roman dark-grey', titleClassName)}>
        {title}
      </span>
      {!hideArrow && (
        <FaSortDown className={cx('dark-grey', rightArrow && 'fr')} size={14} />
      )}
      <Dropdown
        border
        top={scale[0] * 1.5}
        left={-scale[0]}
        width={200}
        backgroundColor={backgroundColor || 'gray'}
        color="darkerGray"
        open={open}
        onDismiss={handleDismissDropdown}
        body={
          <div className="pa3">
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
