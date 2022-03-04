import React from 'react';
import cx from 'classnames';

const PrintShippingLabelHeader = ({className, onViewOrderSummary}) => (
  <div
    className={cx('flex justify-between items-center avenir-roman', className)}
  >
    <h2>Print a USPS Shipping Label</h2>
    <div className="f-regular tint pointer" onClick={onViewOrderSummary}>
      View Order Summary
    </div>
  </div>
);

const EnhancedPrintShippingLabelHeader = React.memo(PrintShippingLabelHeader);

export default EnhancedPrintShippingLabelHeader;
