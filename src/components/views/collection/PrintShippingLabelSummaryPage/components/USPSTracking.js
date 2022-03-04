import React from 'react';
import _ from 'lodash';
import cx from 'classnames';

import PrintShippingHelpers from 'helpers/PrintShippingHelpers';

const USPS_TRACKING_URL = 'https://tools.usps.com/go/TrackConfirmAction';

const USPSTracking = ({className, tracking, service}) => (
  <div className={cx('pa3 avenir-roman gray-600 bg-white', className)}>
    <div className="mb3 f-regular">USPS Tracking</div>
    <div className="f7 lh-copy">
      Tracking Number:{' '}
      <a
        href={`${USPS_TRACKING_URL}?tLabels=${tracking.code}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {_.chunk(tracking.code, 4)
          .map(codeChunk => codeChunk.join(''))
          .join(' ')}
      </a>
      <br />
      Service name: {PrintShippingHelpers.getServiceName(service)}
    </div>
  </div>
);

const EnhancedUSPSTracking = React.memo(USPSTracking);

export default EnhancedUSPSTracking;
