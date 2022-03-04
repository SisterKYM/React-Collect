import React from 'react';
import _ from 'lodash';

import {RowControls} from 'elements';

const PaymentActionsDropdown = ({
  className,
  payerEmail,
  refundsVisible,
  printShippingLabelVisible,
  shippingSummaryVisible,
  onClickPaymentSummary,
  onClickRefunds,
  onClickPrintOrder,
  onClickPrintShippingLabel,
  onClickShippingSummary,
}) => {
  const handleClickEmailPayer = React.useCallback(() => {
    window.location.href = `mailto:${payerEmail}`;
  }, [payerEmail]);

  const controls = React.useMemo(
    () =>
      _.compact([
        {
          tooltip: 'Order Summary',
          onClick: onClickPaymentSummary,
        },
        refundsVisible
          ? {
              tooltip: 'Refunds',
              onClick: onClickRefunds,
            }
          : undefined,
        payerEmail
          ? {
              tooltip: 'Email Payer',
              onClick: handleClickEmailPayer,
            }
          : undefined,
        {
          tooltip: 'Print Order',
          onClick: onClickPrintOrder,
        },
        printShippingLabelVisible
          ? {
              tooltip: 'Print Shipping Label',
              onClick: onClickPrintShippingLabel,
            }
          : undefined,
        shippingSummaryVisible
          ? {
              tooltip: 'Shipping Summary',
              onClick: onClickShippingSummary,
            }
          : undefined,
      ]),
    [
      handleClickEmailPayer,
      onClickPaymentSummary,
      onClickPrintOrder,
      onClickPrintShippingLabel,
      onClickRefunds,
      onClickShippingSummary,
      payerEmail,
      printShippingLabelVisible,
      refundsVisible,
      shippingSummaryVisible,
    ]
  );

  return (
    <RowControls
      className={className}
      dropdownWidth={240}
      controls={controls}
    />
  );
};

export default PaymentActionsDropdown;
