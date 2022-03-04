import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import {Button} from 'elements';

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
}) => {
  const shipToAddress = getPaymentShipToAddress(payment);
  const shippingLabelCreated =
    Boolean(payment.shipment) && payment.shipment.purchased;

  return (
    <div className={cx('flex pa3 items-center bb b--gray-300', className)}>
      <div className="flex flex-column w-third lh-copy">
        <span className="f-regular avenir-roman">
          {payment.tab_member.name}
        </span>
        <span className="f6 avenir-roman">
          {shipToAddress.street1 && shipToAddress.street1.toUpperCase()}
        </span>
        <span className="f6 avenir-roman">
          {shipToAddress.city && shipToAddress.city.toUpperCase()},{' '}
          {shipToAddress.state && shipToAddress.state.toUpperCase()},{' '}
          {shipToAddress.zip && shipToAddress.zip.toUpperCase()}
        </span>
        <span className="f6 avenir-roman">
          {shipToAddress.country && shipToAddress.country.toUpperCase()}
        </span>
      </div>
      <Link
        className="flex w-third justify-center f6 avenir-roman tint"
        target="_blank"
        to={packingSlipLinkTo}
      >
        Packing Slip
      </Link>
      <Link
        className="flex w-third justify-end items-center"
        to={
          shippingLabelCreated
            ? shippingLabelSummaryLinkTo
            : printShippingLabelLinkTo
        }
      >
        <Button
          small
          className={cx(
            'w4',
            shippingLabelCreated ? 'gray-600 bg-gray-300' : 'white bg-tint'
          )}
        >
          {shippingLabelCreated ? 'Summary' : 'Print Label'}
        </Button>
      </Link>
    </div>
  );
};

const EnhancedShippablePaymentRow = React.memo(ShippablePaymentRow);

export default EnhancedShippablePaymentRow;
