import React from 'react';
import cx from 'classnames';
import useOnClickOutside from 'use-onclickoutside';

import {Z_INDEX as curtainZindex} from 'elements/Curtain';

import DropdownBody from './DropdownBody';

const Dropdown = ({
  className,
  childrenWrapperClassName,
  bodyClassName,
  open,
  border,
  borderColorSet,
  borderRadius,
  top,
  right,
  bottom,
  left,
  width,
  height,
  body,
  children,
  onDismiss,
  dropdownWidth,
}) => {
  const bodyRef = React.useRef(null);

  useOnClickOutside(bodyRef, () => {
    const hidden =
      bodyRef.current.clientWidth === 0 || bodyRef.current.clientHeight === 0;

    if (open && !hidden) {
      onDismiss();
    }
  });

  return (
    <div className={cx('container relative overflow-visible br1', className)}>
      <div className={cx('children-wrapper', childrenWrapperClassName)}>
        {children}
      </div>
      <div className="body-wrapper">
        <DropdownBody
          ref={bodyRef}
          className={bodyClassName}
          open={open}
          border={border}
          borderColorSet={borderColorSet}
          borderRadius={borderRadius}
          top={top}
          right={right}
          bottom={bottom}
          left={left}
          width={dropdownWidth || width}
          height={height}
        >
          {body}
        </DropdownBody>
      </div>
      <style jsx>{`
        .container {
          width: ${width};
        }
        .children-wrapper {
          z-index: ${curtainZindex + 3};
        }
        .body-wrapper {
          z-index: ${curtainZindex + 2};
        }
      `}</style>
    </div>
  );
};

const EnhancedDropdown = React.memo(Dropdown);

export default EnhancedDropdown;
