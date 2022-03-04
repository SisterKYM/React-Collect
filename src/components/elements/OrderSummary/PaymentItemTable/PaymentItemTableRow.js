import React, {useCallback, useMemo} from 'react';
import {IoMdSync} from 'react-icons/io';
import {Link, useRouteMatch} from 'react-router-dom';
import _ from 'lodash';

import {currency} from 'helpers/numbers';
import StyledTable from 'elements/StyledTable';

const refundLinkClassNames = 'tint pointer';

const PaymentItemTableRow = ({
  fieldViewsVisible,
  fieldViewsCellVisible,
  paymentItem,
  paymentItemRefunds,
  scheduledInvoices,
  onViewFieldViews,
  onViewRefund,
}) => {
  const handleViewResponses = useCallback(() => {
    onViewFieldViews(fieldViewsVisible ? null : paymentItem);
  }, [paymentItem, fieldViewsVisible, onViewFieldViews]);
  const handleViewRefund = useCallback(() => {
    onViewRefund(paymentItem);
  }, [paymentItem, onViewRefund]);

  const refunded = paymentItemRefunds.length !== 0;
  const showViewHideFieldsButton =
    (paymentItem?.detail?.variant?.optionValues &&
      Object.keys(paymentItem.detail.variant.optionValues).length !== 0) ||
    paymentItem.item_field_views?.length !== 0;

  const scheduledInvoiceIdx = useMemo(
    () =>
      scheduledInvoices.findIndex(
        (invoice) => invoice.tab_object_id === paymentItem.tab_item.id
      ),
    [paymentItem.tab_item.id, scheduledInvoices]
  );

  const match = useRouteMatch();

  return (
    <StyledTable.Row className="f6">
      <StyledTable.Cell>
        <p className="avenir-roman">{paymentItem.tab_item.name}</p>
        {refunded && (
          <p className={refundLinkClassNames} onClick={handleViewRefund}>
            View Refund
          </p>
        )}
        {scheduledInvoiceIdx !== -1 ? (
          <div className="avenir-light text-14">
            <div className="relative mt2 ml3">
              <IoMdSync
                className="absolute"
                style={{top: '0.125rem', left: '-1rem'}}
                size="0.875rem"
              />
              Scheduled Payment:{' '}
              <Link
                className="tint pointer"
                to={
                  match.params.owner && match.params.collection
                    ? `/collection/${match.params.owner}/${match.params.collection}/manage/payments/payment/${paymentItem.payment_id}/scheduled/${scheduledInvoiceIdx}?from=${match.url}`
                    : `scheduled/${scheduledInvoiceIdx}?from=${match.url}`
                }
              >
                View terms
              </Link>
            </div>
          </div>
        ) : null}
      </StyledTable.Cell>
      <StyledTable.Cell className="tr">
        {scheduledInvoiceIdx === -1 ? (
          <>
            <p>{paymentItem.quantity}</p>
            {refunded && (
              <p className={refundLinkClassNames} onClick={handleViewRefund}>
                -
                {_.sum(
                  _.flatMap(
                    paymentItemRefunds.map(({detail}) =>
                      detail.items
                        .filter(
                          (item) => item.payment_item_id === paymentItem.id
                        )
                        .map(({quantity}) => quantity)
                    )
                  )
                )}
              </p>
            )}
          </>
        ) : null}
      </StyledTable.Cell>
      <StyledTable.Cell className="tr">
        {scheduledInvoiceIdx === -1 ? currency(paymentItem.amount) : null}
      </StyledTable.Cell>
      <StyledTable.Cell className="tr">
        {scheduledInvoiceIdx === -1 ? (
          <>
            <p>{currency(paymentItem.total)}</p>
            {refunded && (
              <p className={refundLinkClassNames} onClick={handleViewRefund}>
                -
                {currency(paymentItem.refund_data.total_refunded_cents, {
                  cents: true,
                })}
              </p>
            )}
          </>
        ) : null}
      </StyledTable.Cell>
      {fieldViewsCellVisible && (
        <StyledTable.Cell>
          {showViewHideFieldsButton && (
            <div className="tint pointer tr" onClick={handleViewResponses}>
              {fieldViewsVisible ? 'Hide' : 'View'}
            </div>
          )}
        </StyledTable.Cell>
      )}
    </StyledTable.Row>
  );
};

const EnhancedPaymentItemTableRow = React.memo(PaymentItemTableRow);

export default EnhancedPaymentItemTableRow;
