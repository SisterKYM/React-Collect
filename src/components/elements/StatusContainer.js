import PropTypes from 'prop-types';
import React from 'react';

import {Status} from 'elements';

const StatusContainer = ({
  status,
  hideWithoutMessage = false,
  messages = {},
  statusProps = {},
  children,
  ...props
}) =>
  (status === 'pending' && !hideWithoutMessage) || messages[status] ? (
    <div {...statusProps}>
      <Status status={status} {...props} />
    </div>
  ) : (
    children
  );

const EnhancedStatusContainer = Object.assign(React.memo(StatusContainer), {
  propTypes: {
    status: PropTypes.any,
    statusProps: PropTypes.object,
    messages: PropTypes.object,
    hideWithoutMessage: PropTypes.bool,
  },
});

export default EnhancedStatusContainer;
