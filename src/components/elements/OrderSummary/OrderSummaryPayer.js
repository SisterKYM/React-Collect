import React from 'react';
import cx from 'classnames';

import PayerOverview from 'elements/PayerOverview';

const OrderSummaryPayer = ({className, tabMember, footer}) => (
  <div className={cx('cf w-100 pb4 bb b--gray-300', className)}>
    <PayerOverview
      className="fl mb0-ns"
      tabMember={tabMember}
      footer={footer}
    />
  </div>
);

const EnhancedOrderSummaryPayer = React.memo(OrderSummaryPayer);

export default EnhancedOrderSummaryPayer;
