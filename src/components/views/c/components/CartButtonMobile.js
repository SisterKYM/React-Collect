import cx from 'classnames';
import React from 'react';

import {ReactComponent as CartIcon} from 'theme/images/cart-icon.svg';
import config from 'config';

import AnimatedSlide from './AnimatedSlide';

const CartButtonMobile = ({
  cart,
  cartVisible,
  toggleCartVisible,
  cartElement,
}) => (
  <div className="relative flex items-center">
    <CartIcon
      className={cx('cart-icon', cartElement ? 'pointer' : 'o-50 not-allowed')}
      onClick={toggleCartVisible.on}
    />
    <AnimatedSlide visible={cartVisible} onDismiss={toggleCartVisible.off}>
      {cartElement}
    </AnimatedSlide>
    {cart && cart.items.length !== 0 && (
      <div className="item-count absolute flex justify-center items-center tc avenir-roman gray-600 bg-gray-200 br-100">
        {cart.items.length}
      </div>
    )}
    <style jsx>{`
      .item-count {
        top: -0.75rem;
        right: -0.75rem;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 0.5625rem;
      }
      :global(.cart-icon) {
        fill: ${config.colors.tint};
      }
    `}</style>
  </div>
);

const EnhancedCartButtonMobile = React.memo(CartButtonMobile);

export default EnhancedCartButtonMobile;
