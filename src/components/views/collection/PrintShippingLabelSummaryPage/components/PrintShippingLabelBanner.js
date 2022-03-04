import React from 'react';
import cx from 'classnames';

import {Button} from 'elements';

const PrintShippingLabelBanner = ({className, onPrintShippingLabel}) => (
  <div
    className={cx('flex pa3 justify-between items-center bg-white', className)}
  >
    <h3>Success! You can now print your label.</h3>
    <Button
      backgroundColorSet
      className="bg-brand"
      onClick={onPrintShippingLabel}
    >
      Print Shipping Label
    </Button>
  </div>
);

const EnhancedPrintShippingLabelBanner = React.memo(PrintShippingLabelBanner);

export default EnhancedPrintShippingLabelBanner;
