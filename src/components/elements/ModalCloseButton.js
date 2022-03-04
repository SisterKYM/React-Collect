import {MdClose} from 'react-icons/md';
import React from 'react';
import cx from 'classnames';

const ModalCloseButton = ({className, iconClassName, color, onClick}) => (
  <div className={cx('absolute top-0 right-2 ma3', className)}>
    <div className="fixed pointer" onClick={onClick}>
      <MdClose className={cx(iconClassName, color || 'gray-600')} size={24} />
    </div>
  </div>
);

export default ModalCloseButton;
