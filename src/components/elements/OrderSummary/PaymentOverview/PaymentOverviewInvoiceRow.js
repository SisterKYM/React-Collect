import React from 'react';
import cx from 'classnames';

import {currency} from 'helpers/numbers';

const PaymentOverviewInvoiceRow = ({className, inline, title, value}) => (
  <div className={cx('flex items-center', className)}>
    <div className={inline ? 'mr1' : 'flex-auto'}>{title}</div>
    <div className="tr">{currency(value)}</div>
  </div>
);

const EnhancedPaymentOverviewInvoiceRow = React.memo(PaymentOverviewInvoiceRow);

export default EnhancedPaymentOverviewInvoiceRow;
