import React from 'react';

import {currency} from 'helpers/numbers';
import StyledTable from 'elements/StyledTable';

const PaymentItemTableShippingInfoRow = ({
  placeholderCellVisible,
  shippingInfo,
  shippingInfoRefunds,
  onViewRefund,
}) => {
  const handleViewRefund = React.useCallback(() => {
    onViewRefund(shippingInfo);
  }, [shippingInfo, onViewRefund]);

  const refundLinkClassNames = 'f6 tint pointer';
  const refunded = shippingInfoRefunds.length !== 0;

  return (
    <StyledTable.Row className="f6">
      <StyledTable.Cell>
        <p className="avenir-roman">Shipping</p>
        {refunded && (
          <p className={refundLinkClassNames} onClick={handleViewRefund}>
            View Refund
          </p>
        )}
      </StyledTable.Cell>
      <StyledTable.Cell className="tr">
        <p>1</p>
        {refunded && (
          <p className={refundLinkClassNames} onClick={handleViewRefund}>
            -1
          </p>
        )}
      </StyledTable.Cell>
      <StyledTable.Cell className="tr">
        {currency(shippingInfo.charge)}
      </StyledTable.Cell>
      <StyledTable.Cell className="tr">
        <p>{currency(shippingInfo.charge)}</p>
        {refunded && (
          <p className={refundLinkClassNames} onClick={handleViewRefund}>
            -1
          </p>
        )}
      </StyledTable.Cell>
      {placeholderCellVisible && <StyledTable.Cell />}
    </StyledTable.Row>
  );
};

const EnhancedPaymentItemTableShippingInfoRow = React.memo(
  PaymentItemTableShippingInfoRow
);

export default EnhancedPaymentItemTableShippingInfoRow;
