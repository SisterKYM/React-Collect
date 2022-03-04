import React from 'react';

import {CommonButton} from 'elements';

const InstantReminder = ({unpaid, sendAll}) => (
  <div className="flex justify-between items-center">
    <span className="text-16 gray-600">Send an instant reminder</span>
    <CommonButton
      className="bg-tint white pt-12"
      disabled={!unpaid.length}
      onClick={sendAll}
    >
      Send Now
    </CommonButton>
  </div>
);

const EnhancedInstantReminder = React.memo(InstantReminder);

export default EnhancedInstantReminder;
