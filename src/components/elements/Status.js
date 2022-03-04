import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Failure, Loading, Success} from './status-indicators';

const Status = ({
  className,
  status,
  messages,
  statuses: [REQUEST, SUCCESS, FAILURE],
  indicators,
  indicatorProps,
}) => {
  indicators = indicators || {
    [REQUEST]: Loading,
    [SUCCESS]: Success,
    [FAILURE]: Failure,
  };

  const indicator = React.useMemo(
    () =>
      React.createElement(
        indicators[status || 'pending'],
        indicatorProps[status || 'pending']
      ),
    [indicatorProps, indicators, status]
  );

  if (!status) {
    return null;
  }

  const message = messages[status];

  return message ? (
    <div className={cx('flex items-center', className)}>
      <i>{indicator}</i>
      <div className="message-wrapper text-14 avenir-roman ml2">{message}</div>
      <style jsx>{`
        .message-wrapper {
          height: 15px;
        }
      `}</style>
    </div>
  ) : (
    <div className={className}>{indicator}</div>
  );
};

const EnhancedStatus = Object.assign(React.memo(Status), {
  propTypes: {
    indicators: PropTypes.object,
    indicatorProps: PropTypes.object,
    status: PropTypes.any,
    messages: PropTypes.object,
    statuses: PropTypes.array,
  },
  defaultProps: {
    indicatorProps: {
      pending: {},
      success: {},
      failure: {},
    },
    messages: {},
    statuses: ['pending', 'success', 'failure'],
  },
});

export default EnhancedStatus;
