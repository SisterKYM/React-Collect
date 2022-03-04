import {TiWarningOutline} from 'react-icons/ti';
import React from 'react';

const StatusIndicatorFailure = () => (
  <TiWarningOutline className="flamingo" size={22} />
);

const EnhancedStatusIndicatorFailure = React.memo(StatusIndicatorFailure);

export default EnhancedStatusIndicatorFailure;
