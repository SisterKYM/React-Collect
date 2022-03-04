import React from 'react';

import {BasicLayout} from 'layout';
import {Status} from 'elements';

const PendingPage = () => (
  <BasicLayout>
    <div className="pending-page-container flex h-100 justify-center items-center">
      <Status status="pending" />
    </div>
    <style jsx>{`
      .pending-page-container {
        min-height: 90vh;
      }
    `}</style>
  </BasicLayout>
);

const EnhancedPendingPage = React.memo(PendingPage);

export default EnhancedPendingPage;
