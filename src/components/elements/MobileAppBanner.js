import React from 'react';
import SmartBanner from 'react-smartbanner';

import 'react-smartbanner/dist/main.css';

const STORE_TEXT = 'Download the App';

const MobileAppBanner = () => (
  <SmartBanner
    daysHidden={5}
    daysReminder={60}
    title="Collect on the Go"
    price={{
      android: '',
      ios: '',
    }}
    storeText={{
      android: STORE_TEXT,
      ios: STORE_TEXT,
    }}
  />
);

const EnhancedMobileAppBanner = React.memo(MobileAppBanner);

export default EnhancedMobileAppBanner;
