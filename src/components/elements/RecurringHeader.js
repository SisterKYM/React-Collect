import {IoMdSync} from 'react-icons/io';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const RecurringHeader = ({
  className,
  iconStyle,
  isRecurring,
  iconSize = 13,
  message,
}) => (
  <div
    className={cx('relative', className)}
    style={{paddingLeft: isRecurring ? iconSize + 1 : 0}}
  >
    {isRecurring && (
      <IoMdSync
        className="absolute left-0"
        style={{top: iconStyle ? iconStyle.top || 0 : 0}}
        size={iconSize}
      />
    )}
    {message}
  </div>
);

const EnhancedRecurringHeader = Object.assign(React.memo(RecurringHeader), {
  propTypes: {
    className: PropTypes.string,
    isRecurring: PropTypes.bool,
    iconSize: PropTypes.number,
    iconStyle: PropTypes.shape({
      top: PropTypes.number,
    }),
    message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  },
});

export default EnhancedRecurringHeader;
