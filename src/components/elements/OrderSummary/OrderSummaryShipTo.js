import React from 'react';
import {CommonButton} from 'elements';

const OrderSummaryShipTo = ({
  shippingMethod,
  shipTo,
  shipmentPurchased,
  onPrintShippingLabel,
}) => {
  const localPickup = shippingMethod !== 'toMe' || !shipTo.name;

  return (
    <div className="f6 lh-copy avenir-light">
      <h5 className="f6 avenir-roman">Ship to:</h5>
      <div className="mb3">
        {localPickup ? (
          <p>Local Pickup</p>
        ) : (
          <>
            <p>{shipTo.name}</p>
            <p>{shipTo.address}</p>
            <p>
              {shipTo.city}, {shipTo.state} {shipTo.zip}
            </p>
            <p>{shipTo.country === 'CA' ? 'Canada' : 'United States'}</p>
          </>
        )}
      </div>
      {Boolean(onPrintShippingLabel) && !localPickup && (
        <CommonButton
          className="pt-12 bg-tint white pointer"
          onClick={onPrintShippingLabel}
        >
          {shipmentPurchased ? 'View Shipping Summary' : 'Print Shipping Label'}
        </CommonButton>
      )}
    </div>
  );
};

const EnhancedOrderSummaryShipTo = React.memo(OrderSummaryShipTo);

export default EnhancedOrderSummaryShipTo;
