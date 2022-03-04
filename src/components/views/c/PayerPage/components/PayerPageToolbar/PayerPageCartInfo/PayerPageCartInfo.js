import cx from 'classnames';
import React from 'react';

import {currency} from 'helpers/numbers';

import PayerPageCartDropdown from './PayerPageCartDropdown';

const PayerPageCartInfo = ({
  cart,
  cartVisible,
  toggleCartVisible,
  cartElement,
}) => (
  <div
    className={cx(
      'flex items-center',
      cartElement ? 'pointer' : 'o-50 not-allowed'
    )}
    onClick={toggleCartVisible.on}
  >
    <PayerPageCartDropdown
      className="mr3"
      dropdownVisible={cartVisible}
      onDismissDropdown={toggleCartVisible.off}
      cartElement={cartElement}
    />
    <div className="f6 avenir-light gray-600">
      {cart ? cart.itemCount : 0} /{' '}
      <span className="avenir-heavy">{currency(cart ? cart.subtotal : 0)}</span>
    </div>
  </div>
);

const EnhancedPayerPageCartInfo = React.memo(PayerPageCartInfo);

export default EnhancedPayerPageCartInfo;
