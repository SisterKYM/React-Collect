import React from 'react';
import cx from 'classnames';

import {CreditCardSelectRow, PrintShippingLabelInvoice} from 'elements';
import PrintShippingHelpers from 'helpers/PrintShippingHelpers';

const ShippingCosts = ({className, shipment}) => {
  const signatureAmount = PrintShippingHelpers.getSignatureConfirmationAmountForService(
    shipment.selected_rate.service
  );

  return (
    <div className={cx('pa3 avenir-roman gray-600 bg-white', className)}>
      <div className="flex">
        <div className="w-50 mr3">
          <div className="mb3 f-regular">Shipping Costs</div>
          <PrintShippingLabelInvoice
            titleHidden
            amountsVisible
            amounts={{
              postage: Number.parseFloat(shipment.selected_rate.rate),
              signature:
                shipment.options.delivery_confirmation === 'SIGNATURE'
                  ? signatureAmount
                  : null,
            }}
          />
        </div>
        <div className="w-50 ml3">
          <div className="mb3 f-regular">Payment method</div>
          <CreditCardSelectRow creditCard={shipment.paymentMethod} />
        </div>
      </div>
    </div>
  );
};

const EnhancedShippingCosts = React.memo(ShippingCosts);

export default EnhancedShippingCosts;
