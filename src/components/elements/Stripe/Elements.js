import {Elements as StripeElements} from 'react-stripe-elements';
import React from 'react';

const Elements = ({children}) => (
  <StripeElements
    fonts={[
      {
        family: 'AvenirLTStd-Light',
        src:
          'url(https://s3.amazonaws.com/assets.cheddarup.com/webfonts/338CD6_5_0.woff2)',
      },
    ]}
  >
    {children}
  </StripeElements>
);

const EnhancedElements = React.memo(Elements);

export default EnhancedElements;
