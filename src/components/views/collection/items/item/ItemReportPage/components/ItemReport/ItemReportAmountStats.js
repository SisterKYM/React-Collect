import React from 'react';
import cx from 'classnames';

import {currency} from 'helpers/numbers';

const ItemReportAmountStats = ({className, item}) => (
  <div className={cx(className, 'avenir-light text-14 line-20')}>
    <div className="flex justify-between items-center">
      <div>Collected:</div>
      <div>{currency(item.amount_sold)}</div>
    </div>
    {item.amount_refunded > 0 && (
      <>
        <div className="flex justify-between items-center">
          <div>Refunds:</div>
          <div>{currency(item.amount_refunded)}</div>
        </div>
        <div className="flex pv3 mt2 justify-between items-center bt b--gray-300">
          <div className="avenir-roman">Net Amount:</div>
          <div>{currency(item.net_amount)}</div>
        </div>
      </>
    )}
  </div>
);

const EnhancedItemReportAmountStats = React.memo(ItemReportAmountStats);

export default EnhancedItemReportAmountStats;
