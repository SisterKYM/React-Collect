import {Field} from 'formik';
import React from 'react';
import _ from 'lodash';

import {currency} from 'helpers/numbers';
import Select from 'elements/Select';
import StyledTable from 'elements/StyledTable';

const RefundableItemTableRow = ({
  hasDiscounts,
  refundableItem,
  selectedQuantity,
}) => (
  <StyledTable.Row>
    <StyledTable.Cell>
      <p className="avenir-roman f6">{refundableItem.name}</p>
    </StyledTable.Cell>
    <StyledTable.Cell>
      <p className="avenir-roman f6">{refundableItem.refundableQuantity}</p>
    </StyledTable.Cell>
    <StyledTable.Cell>
      <p className="w-50 tr f6">
        {currency(refundableItem.perItemPrice, {cents: true})}
      </p>
    </StyledTable.Cell>
    {hasDiscounts && (
      <StyledTable.Cell>
        <p className="w-50 tr f6">
          -{currency(refundableItem.perItemDiscount, {cents: true})}
        </p>
      </StyledTable.Cell>
    )}
    <StyledTable.Cell>
      <Field name={`quantities.quantity-${refundableItem.payment_item_id}`}>
        {({field}) => (
          <Select
            small
            className="refundable-item-table-row-input ba br2 f6"
            options={_.range(
              0,
              refundableItem.refundableQuantity + 1
            ).map(option => ({children: option, value: option}))}
            input={field}
          />
        )}
      </Field>
    </StyledTable.Cell>
    <StyledTable.Cell>
      <p className="tr f6">
        {currency(Number(selectedQuantity || 0) * refundableItem.perItemNet, {
          cents: true,
        })}
      </p>
    </StyledTable.Cell>
    <style jsx>{`
      :global(.refundable-item-table-row-input) {
        width: 60px;
      }
    `}</style>
  </StyledTable.Row>
);

const EnhancedRefundableItemTableRow = React.memo(RefundableItemTableRow);

export default EnhancedRefundableItemTableRow;
