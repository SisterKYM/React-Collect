import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const SentStatus = ({onRemindClick, remindPending, status}) => (
  <div className="gray-600">
    {`${status}${status === 'Pending' ? ' | ' : ''}`}
    {status === 'Pending' && (
      <span
        onClick={onRemindClick}
        className={cx('pointer', remindPending ? 'gray-400' : 'tint')}
      >
        Resend
      </span>
    )}
  </div>
);

SentStatus.propTypes = {
  onRemindClick: PropTypes.func,
  remindPending: PropTypes.bool,
  status: PropTypes.string,
};

const EnhancedSentStatus = React.memo(SentStatus);

export default EnhancedSentStatus;
