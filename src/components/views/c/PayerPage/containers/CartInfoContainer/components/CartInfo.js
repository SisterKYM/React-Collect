import React from 'react';
import cx from 'classnames';

import {currency} from 'helpers/numbers';
import {ReactComponent as EmptyCart} from 'theme/images/EmptyCart.svg';
import {Touchable} from 'elements';

const CartInfo = ({
  visible,
  missingRequiredItemViews,
  cart,
  proceedButtonTitle,
  noForms,
  onViewRequiredItems,
  renderCartItemListItem,
  onProceed,
  onDismiss,
  showEmpty,
}) => {
  const bottomDivRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        bottomDivRef.current.parentNode.parentNode.scrollTop =
          bottomDivRef.current.offsetTop;
      });
    }
  }, [visible]);

  return (
    <div className="cart-container cursor-default bg-white">
      <header className="flex dn-ns items-center ph3 pv4 gray-600 bg-gray-200">
        <h2 className="db flex-auto f4 merriweather">Your Cart</h2>
        <div className="f8 avenir-roman tr dim pointer" onClick={onDismiss}>
          Close
        </div>
      </header>
      <div className="flex-auto flex flex-column">
        <div className="pa2 flex-auto overflow-y-scroll">
          <ul className={cx('ph3', showEmpty ? 'flex justify-center' : '')}>
            {showEmpty ? (
              <div className="empty-cart-svg-wrapper pv3">
                <EmptyCart />
              </div>
            ) : (
              cart.items.map(renderCartItemListItem)
            )}
          </ul>
          {showEmpty && (
            <p className="tc f-small avenir-roman">Your cart is empty</p>
          )}
        </div>
        <div className={cx('ph3 pt3 bt b--gray-300', showEmpty ? 'dn' : '')}>
          <p className="f6 tr gray-550">
            <span className="avenir-roman">Subtotal:</span>{' '}
            <span className="avenir-heavy">{currency(cart.subtotal)}</span>
          </p>
        </div>
        <div ref={bottomDivRef} className="pa3">
          {missingRequiredItemViews ? (
            <>
              <div className="mb3 f6 tc avenir-roman brand">
                Additional items are required to proceed to checkout
              </div>
              <Touchable
                className="w-100 pv2 f-regular bg-brand white"
                onClick={onViewRequiredItems}
              >
                View Required Items
              </Touchable>
            </>
          ) : !showEmpty || !noForms ? (
            <Touchable
              className="w-100 bg-brand white"
              size="EXTRA_LARGE"
              onClick={onProceed}
            >
              {proceedButtonTitle}
            </Touchable>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        .cart-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        @media (min-width: 30em) {
          .cart-container {
            width: ${showEmpty ? '17rem' : '23.5rem'};
            -webkit-overflow-scrolling: touch;
          }
        }
        .empty-cart-svg-wrapper {
          width: 100px;
        }
      `}</style>
    </div>
  );
};

const EnhancedCartInfo = React.memo(CartInfo);

export default EnhancedCartInfo;
