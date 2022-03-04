import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';
import {Button, NoteEditor} from 'elements';

const getPaymentShipToAddress = payment =>
  payment.shipment
    ? payment.shipment.shipTo
    : {
        ...(payment.shipping_info.shipTo || {}),
        street1: payment.shipping_info.shipTo
          ? payment.shipping_info.shipTo.address
          : '',
      };

const ShippablePaymentRow = ({
  className,
  payment,
  packingSlipLinkTo,
  shippingLabelSummaryLinkTo,
  printShippingLabelLinkTo,
  onAddNote,
  updatePaymentStatus,
}) => {
  const shipToAddress = getPaymentShipToAddress(payment);
  const shippingLabelCreated =
    Boolean(payment.shipment) && payment.shipment.purchased;
  const handleSubmitNote = data => {
    onAddNote({
      note: data.note,
      payment: payment.id,
    });
  };

  return (
    <div
      className={cx(
        'flex pv3 ph4 items-start bb b--gray-300 gray-600',
        className
      )}
    >
      <div className="flex flex-column w-third lh-copy">
        <span className="text-16 avenir-roman">{payment.tab_member.name}</span>
        <span className="text-14 avenir-light">
          {shipToAddress.street1 && shipToAddress.street1}
        </span>
        <span className="text-14 avenir-light">
          {shipToAddress.city && shipToAddress.city},{' '}
          {shipToAddress.state && shipToAddress.state},{' '}
          {shipToAddress.zip && shipToAddress.zip}
        </span>
        <span className="text-14 avenir-light">
          {shipToAddress.country && shipToAddress.country}
        </span>
      </div>
      <Link
        className="flex w-third justify-center text-14 avenir-light tint"
        target="_blank"
        to={packingSlipLinkTo}
      >
        Packing Slip
      </Link>
      <div className="w-third justify-end flex">
        <div className="dn flex-ns items-start justify-end mr3">
          <div className="mr3 text-14" style={{maxWidth: 'calc(100% - 46px)'}}>
            {payment.note}
          </div>
          <NoteEditor
            form={`views/collection/manage/Payment-${payment.id}`}
            initialValues={payment}
            onSubmit={handleSubmitNote}
            status={updatePaymentStatus}
            tooltip="Add note"
          />
        </div>
        <Link
          className="items-center"
          to={
            shippingLabelCreated
              ? shippingLabelSummaryLinkTo
              : printShippingLabelLinkTo
          }
        >
          <Button
            small
            className={cx(
              'w4 text-12',
              shippingLabelCreated ? 'gray-600 bg-gray-250' : 'white bg-tint'
            )}
            style={{height: 30}}
          >
            {shippingLabelCreated ? 'Summary' : 'Print Label'}
          </Button>
        </Link>
      </div>
      <style jsx>{`
        .edit-icon {
          width: 30px;
          padding: 6px;
        }
      `}</style>
    </div>
  );
};

const EnhancedShippablePaymentRow = React.memo(ShippablePaymentRow);

export default EnhancedShippablePaymentRow;
