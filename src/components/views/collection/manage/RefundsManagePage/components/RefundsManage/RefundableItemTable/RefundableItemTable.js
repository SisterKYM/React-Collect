import React from 'react';
import _ from 'lodash';

import StyledTable from 'elements/StyledTable';

import RefundableItemTableRow from './RefundableItemTableRow';

const RefundableItemTable = ({
  className,
  refundableItems,
  selectedQuantities,
}) => {
  const hasDiscounts = React.useMemo(
    () => _.some(refundableItems, ({perItemDiscount}) => perItemDiscount),
    [refundableItems]
  );

  return (
    <StyledTable.Table className={className}>
      <StyledTable.Head primary>
        <StyledTable.Row head>
          <StyledTable.HeadCell className="f7">
            Available Item(s)
          </StyledTable.HeadCell>
          <StyledTable.HeadCell className="f7">Qty</StyledTable.HeadCell>
          <StyledTable.HeadCell>
            <p className="w-50 tr f7">Price</p>
          </StyledTable.HeadCell>
          {hasDiscounts && (
            <StyledTable.HeadCell>
              <p className="w-50 tr f7">Discount</p>
            </StyledTable.HeadCell>
          )}
          <StyledTable.HeadCell className="f7">Qty</StyledTable.HeadCell>
          <StyledTable.HeadCell>
            <p className="tr f7">Amount</p>
          </StyledTable.HeadCell>
        </StyledTable.Row>
      </StyledTable.Head>
      <tbody>
        {refundableItems.length === 0 ? (
          <p className="pa3 f6">All available items have been refunded</p>
        ) : (
          refundableItems.map((refundableItem) => (
            <RefundableItemTableRow
              key={refundableItem.payment_item_id}
              hasDiscounts={hasDiscounts}
              refundableItem={refundableItem}
              selectedQuantity={
                selectedQuantities[`quantity-${refundableItem.payment_item_id}`]
              }
            />
          ))
        )}
      </tbody>
    </StyledTable.Table>
  );
};

const EnhancedRefundableItemTable = React.memo(RefundableItemTable);

export default EnhancedRefundableItemTable;
