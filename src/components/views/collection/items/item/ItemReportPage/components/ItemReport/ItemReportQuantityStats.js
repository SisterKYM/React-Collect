import React from 'react';
import cx from 'classnames';

const ItemReportQuantityStats = ({className, item}) => (
  <div className={cx(className, 'avenir-light text-14 line-20')}>
    <div className="flex justify-between items-center">
      <div>Quantity Sold</div>
      <div>{item.quantity_sold}</div>
    </div>
    {item.quantity_refunded > 0 && (
      <>
        <div className="flex justify-between items-center">
          <div>Quantity Refunded</div>
          <div>{item.quantity_refunded}</div>
        </div>
        <div className="flex mt2 pv3 mb3 justify-between items-center bt b--gray-300 avenir-roman">
          <div>Net Quantity</div>
          <div>{item.net_quantity}</div>
        </div>
      </>
    )}
  </div>
);

const EnhancedItemReportQuantityStats = React.memo(ItemReportQuantityStats);

export default EnhancedItemReportQuantityStats;
