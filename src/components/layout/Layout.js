import React from 'react';

import {GrowlAlertsContainer} from 'containers';

const Layout = ({children, growlProps}) => (
  <>
    <GrowlAlertsContainer {...growlProps} />
    {children}
  </>
);

const EnhancedLayout = React.memo(Layout);

export default EnhancedLayout;
