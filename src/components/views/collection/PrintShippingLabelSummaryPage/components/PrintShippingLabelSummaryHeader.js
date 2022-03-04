import React from 'react';
import cx from 'classnames';

const PrintShippingLabelSummaryHeader = ({
  className,
  reprintShippingLabelVisible,
  onReprintShippingLabel,
}) => (
  <div
    className={cx('flex justify-between items-center avenir-roman', className)}
  >
    <h2>Shipping Summary</h2>
    {reprintShippingLabelVisible && (
      <div className="f-regular tint pointer" onClick={onReprintShippingLabel}>
        Reprint Shipping Label
      </div>
    )}
  </div>
);

const EnhancedPrintShippingLabelSummaryHeader = React.memo(
  PrintShippingLabelSummaryHeader
);

export default EnhancedPrintShippingLabelSummaryHeader;
