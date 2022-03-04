import React from 'react';

import checkMark from 'theme/images/CheckMarkWhite.svg';

const size = 22;

const StatusIndicatorSuccess = () => (
  <>
    <div className="flex justify-center items-center bg-center bg-flamingo br-100" />
    <style jsx>{`
      div {
        width: ${size}px;
        height: ${size}px;
        background-image: url(${checkMark});
      }
    `}</style>
  </>
);

const EnhancedStatusIndicatorSuccess = React.memo(StatusIndicatorSuccess);

export default EnhancedStatusIndicatorSuccess;
