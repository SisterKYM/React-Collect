import React from 'react';
import cx from 'classnames';

import {currency} from 'helpers/numbers';

const NO_AMOUNT_PLACEHOLDER = '$ --.--';

const PrintShippingLabelInvoice = ({amounts, amountsVisible, titleHidden}) => {
  const signatureAmountVisible =
    typeof amounts.signature === 'number' && amountsVisible;
  const total = amounts.postage + amounts.signature;

  return (
    <div className="f7 avenir-roman gray-600">
      {!titleHidden && <div className="mb3 f6">Shipping Costs</div>}
      <div
        className={cx(
          'flex justify-between items-center',
          signatureAmountVisible ? 'mb2' : 'mb3'
        )}
      >
        <div>Postage Cost</div>
        <div className="tr">
          {amountsVisible ? currency(amounts.postage) : NO_AMOUNT_PLACEHOLDER}
        </div>
      </div>
      {signatureAmountVisible && (
        <div className="flex justify-between items-center mb3">
          <div>Signature Confirmation</div>
          <div className="tr">{currency(amounts.signature)}</div>
        </div>
      )}
      <hr />
      <div className="flex mt2 mb3 justify-between items-center f6">
        <div>Total</div>
        <div className="tr">
          {amountsVisible ? currency(total) : NO_AMOUNT_PLACEHOLDER}
        </div>
      </div>
    </div>
  );
};

const EnhancedPrintShippingLabelInvoice = React.memo(PrintShippingLabelInvoice);

export default EnhancedPrintShippingLabelInvoice;
