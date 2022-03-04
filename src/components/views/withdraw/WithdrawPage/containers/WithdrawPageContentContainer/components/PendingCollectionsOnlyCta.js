import React from 'react';

import {currency} from 'helpers/numbers';

const PendingCollectionsOnlyCta = ({total}) => (
  <div className="withdraw-content-container bg-light-tint br2 gray-600">
    <h2 className="avenir-roman">No Funds Available For Withdrawal</h2>
    <div className="flex mt2 justify-center">
      <div className="mw7 description">
        You have {currency(total)} in pending payments. Check back here in 3-5
        business days to withdraw!
      </div>
    </div>
    <style jsx>{`
      h2 {
        font-size: 18px;
        line-height: 32px;
      }
      .withdraw-content-container {
        display: inline-block;
        padding: 30px 25px;
      }
      .description {
        font-size: 14px;
        line-height: 21px;
      }
    `}</style>
  </div>
);

const EnhancedPendingCollectionsOnlyCta = React.memo(PendingCollectionsOnlyCta);

export default EnhancedPendingCollectionsOnlyCta;
