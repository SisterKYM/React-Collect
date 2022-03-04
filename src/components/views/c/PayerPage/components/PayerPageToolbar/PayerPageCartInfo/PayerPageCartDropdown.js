import cx from 'classnames';
import React from 'react';

import {Dropdown} from 'elements';
import {ReactComponent as CartIcon} from 'theme/images/cart-icon.svg';
import config from 'config';

const PayerPageCartDropdown = ({
  className,
  dropdownVisible,
  onDismissDropdown,
  cartElement,
}) => (
  <Dropdown
    className="payer-page-cart-dropdown"
    open={dropdownVisible}
    bodyClassName="top-2"
    top="7.1rem"
    right={0}
    width="auto"
    height="50vh"
    body={cartElement}
    onDismiss={onDismissDropdown}
    borderRadius
  >
    <CartIcon className={cx('cart-icon', className)} />
    <style jsx>{`
      :global(.payer-page-cart-dropdown) {
        position: static !important;
      }
      :global(.cart-icon) {
        fill: ${config.colors.tint};
      }
    `}</style>
  </Dropdown>
);

const EnhancedPayerPageCartDropdown = React.memo(PayerPageCartDropdown);

export default EnhancedPayerPageCartDropdown;
