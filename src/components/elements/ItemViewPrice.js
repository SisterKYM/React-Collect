import React from 'react';

import {currency} from 'helpers/numbers';
import CartHelpers from 'helpers/CartHelpers';
import parseNumberValue from 'helpers/parseNumberValue';

const ItemViewPrice = ({
  className,
  itemView,
  listing,
  withDifferentRetailPrices,
  withDifferentAmounts,
}) => {
  const amount = CartHelpers.getItemViewPrice({itemView, listing});
  const retailPrice = listing ? listing.retailPrice : itemView.retailPrice;
  const retailPriceVisible =
    typeof retailPrice === 'number' &&
    Boolean(retailPrice) &&
    parseNumberValue(amount) !== retailPrice;
  const amountVisible =
    typeof amount === 'string' ? parseNumberValue(amount) !== 0 : true;

  return retailPriceVisible || amountVisible ? (
    <div className={className}>
      {amount ? (
        <>
          {retailPriceVisible && (
            <span className="mr2 f6 avenir-light strike gray-400">
              {currency(retailPrice)}
              {withDifferentRetailPrices && '+'}
            </span>
          )}
          {amountVisible && (
            <span className="f6 avenir-roman gray-600">
              {amount}
              {withDifferentAmounts && '+'}
            </span>
          )}
        </>
      ) : (
        <span className="f6 avenir-roman gray-600">Enter Amount</span>
      )}
    </div>
  ) : null;
};

const EnhancedItemViewPrice = React.memo(ItemViewPrice);

export default EnhancedItemViewPrice;
