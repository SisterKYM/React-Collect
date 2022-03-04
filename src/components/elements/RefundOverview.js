import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import {currency} from 'helpers/numbers';

const renderRefundItem = (refundItem, idx) => (
  <div
    key={refundItem.payment_item_id}
    className={cx('flex justify-between', idx !== 0 && 'mt4')}
  >
    <div>
      <div>{refundItem.name}</div>
      <div>Qty: {refundItem.quantity}</div>
    </div>
    <div>{currency(refundItem.amount, {cents: true})}</div>
  </div>
);

const RefundOverview = ({refund, tabMember, onResendRefundConfirmation}) => {
  const receiptDetailsVisible =
    (Boolean(refund?.detail?.taxes) && refund?.detail?.taxes?.length !== 0) ||
    Boolean(refund?.detail?.shipping);

  return (
    <>
      <div className="pb3 bb b--gray-300">
        {onResendRefundConfirmation && (
          <p
            className="f6 line-24 avenir-light tint pointer"
            onClick={onResendRefundConfirmation}
          >
            Resend Refund Confirmation to Payer
          </p>
        )}
      </div>
      <div className="pv3 f6 line-20 avenir-light bb b--gray-300 gray-600">
        <div>Payer: {tabMember.name}</div>
        <div>Date: {moment(refund.created_at).format('DD/MM/YY')}</div>
        <div>Amount: {currency(refund.amount)}</div>
      </div>
      {Boolean(refund?.detail?.items) &&
        refund?.detail?.items?.length !== 0 && (
          <div className="pv3 f6 line-20 avenir-light bb b--gray-300 gray-600">
            {refund?.detail?.items
              ?.filter(({amount, quantity}) => amount !== 0 || quantity !== 0)
              ?.map((x, idx) => renderRefundItem(x, idx))}
          </div>
        )}
      {receiptDetailsVisible && (
        <div className="pv3 f6 line-20 avenir-light bb b--gray-300 gray-600">
          {refund.detail.taxes.map((tax, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div>{tax.name}</div>
              <div>{currency(tax.amount, {cents: true})}</div>
            </div>
          ))}
          {Boolean(refund.detail.shipping) && (
            <div className="flex justify-between items-center f6 line-20 avenir-light gray-600">
              <div>Shipping:</div>
              <div>{currency(refund.detail.shipping, {cents: true})}</div>
            </div>
          )}
        </div>
      )}
      <div className="pv3">
        <div className="flex justify-between items-center f6 line-24 avenir-roman">
          <div>Refund Total</div>
          <div>{currency(refund.amount)}</div>
        </div>
      </div>
    </>
  );
};

const EnhancedRefundOverview = React.memo(RefundOverview);

export default EnhancedRefundOverview;
