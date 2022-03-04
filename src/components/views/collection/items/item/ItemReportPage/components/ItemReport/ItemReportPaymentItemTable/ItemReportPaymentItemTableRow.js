import React from 'react';
import moment from 'moment';

import {PAYMENT_METHOD_LABELS} from 'views/collection/constants';
import {StyledTable} from 'elements';
import {currency} from 'helpers/numbers';

const ItemReportPaymentItemTableRow = ({
  fieldViewsCellVisible,
  fieldViewsVisible,
  paymentItem,
  onViewFieldViews,
}) => {
  const handleViewResponses = React.useCallback(() => {
    onViewFieldViews(fieldViewsVisible ? null : paymentItem);
  }, [paymentItem, fieldViewsVisible, onViewFieldViews]);

  const refundLinkClassNames = 'f6 tint';
  const refundData = paymentItem.refund_data;
  const refunded =
    Boolean(refundData) &&
    Boolean(refundData.total_refunded_cents) &&
    refundData.total_refunded_cents > 0;

  return (
    <StyledTable.Row className="f6">
      <StyledTable.Cell className="avenir-roman">
        <p>{paymentItem.payment.tab_member.name}</p>
        {refunded && (
          <p className={refundLinkClassNames}>
            {refundData.net_amount_cents > 0
              ? 'Partially Refunded'
              : 'Refunded'}
          </p>
        )}
      </StyledTable.Cell>
      <StyledTable.Cell>
        <p>{moment(paymentItem.payment.created_at).format('MM/DD/YYYY')}</p>
      </StyledTable.Cell>
      <StyledTable.Cell>
        <p>{paymentItem.quantity}</p>
        {refunded && (
          <p className={refundLinkClassNames}>
            -{refundData.quantity_refunded}
          </p>
        )}
      </StyledTable.Cell>
      <StyledTable.Cell>
        <p>{currency(paymentItem.total)}</p>
        {refunded && (
          <p className={refundLinkClassNames}>
            -
            {currency(refundData.total_refunded_cents, {
              cents: true,
            })}
          </p>
        )}
      </StyledTable.Cell>
      <StyledTable.Cell className="tr">
        <p>
          {PAYMENT_METHOD_LABELS[paymentItem.payment.payment_method] ||
            'Unknown'}
        </p>
      </StyledTable.Cell>
      {fieldViewsCellVisible && (
        <StyledTable.Cell className="dn-p tr">
          {paymentItem.item_field_views.length !== 0 && (
            <div className="tint pointer" onClick={handleViewResponses}>
              {fieldViewsVisible ? 'hide' : 'view'}
            </div>
          )}
        </StyledTable.Cell>
      )}
    </StyledTable.Row>
  );
};

const EnhancedItemReportPaymentItemTableRow = React.memo(
  ItemReportPaymentItemTableRow
);

export default EnhancedItemReportPaymentItemTableRow;
