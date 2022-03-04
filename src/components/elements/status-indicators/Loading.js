import {RotatingPlane} from 'better-react-spinkit';
import React from 'react';

const StatusIndicatorLoading = ({color}) => <RotatingPlane color={color} />;

const EnhancedStatusIndicatorLoading = React.memo(StatusIndicatorLoading);

export default EnhancedStatusIndicatorLoading;
