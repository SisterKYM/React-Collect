import {IoMdMore} from 'react-icons/io';
import React from 'react';
import cx from 'classnames';

import {dragHandle} from 'theme/sortable';
import Tooltip from 'elements/Tooltip';

const DragHandle = ({className, iconClassName}) => (
  <Tooltip
    className={cx('pointer', dragHandle, className)}
    style={{
      left: 2,
      bottom: 40,
      width: 150,
      zIndex: 1,
    }}
    arrowPosition={11}
    text="Drag to reorder"
  >
    <IoMdMore
      style={{fontSize: 32}}
      className={cx('gray-400 move', iconClassName)}
    />
  </Tooltip>
);

const EnhancedDragHandle = React.memo(DragHandle);

export default EnhancedDragHandle;
