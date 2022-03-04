import {IoMdSync} from 'react-icons/io';
import cx from 'classnames';
import React from 'react';
import {generatePath, Link} from 'react-router-dom';
import {Touchable} from 'elements';
import {useFetcher} from 'rest-hooks';
import CartItemResource from 'resources/CartItemResource';
import {currency} from 'helpers/numbers';
import CartHelpers from 'helpers/CartHelpers';
import ImagesUtils from 'helpers/ImagesUtils';

import CarItemVariantsAndFieldViews from './CarItemVariantsAndFieldViews';

const CartOverview = ({
  className,
  cart,
  smallLandscape,
  collectionSlug,
  collectionName,
  itemsRemoved,
}) => {
  const deleteCartItem = useFetcher(CartItemResource.deleteShape());
  const cartUuid = cart && cart.uuid;
  const [deleting, setDeleting] = React.useState(false);
  itemsRemoved &&
    itemsRemoved.actions_taken &&
    itemsRemoved.actions_taken.forEach(actionTaken => {
      if (actionTaken.action === 'quantity_adjusted') {
        cart.items.forEach(cartItem => {
          if (cartItem.id === actionTaken.item.id) {
            cartItem.revised_quantity = `Available qty: ${actionTaken.available}`;
          }
        });
      }
    });
  const handleDelete = async cartItemId => {
    try {
      setDeleting(cartItemId);
      await deleteCartItem({collectionSlug, cartUuid, uuid: cartItemId});
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div
      className={cx(
        'ph3 ph3-ns pv4',
        smallLandscape ? 'pv4-ns' : 'pv6rem-ns',
        className
      )}
    >
      <h3 className="dn db-ns w-100 pb3 mb0 f3 lh-copy merriweather gray-600">
        {collectionName}
      </h3>
      <div>
        <Link
          className="f6 avenir-roman"
          to={{
            pathname: generatePath('/c/:collection', {
              collection: collectionSlug,
            }),
            state: {cartVisible: true},
          }}
        >
          Edit Cart
        </Link>
      </div>
      <ul className="pt4">
        {cart.items.map(cartItem => (
          <li key={cartItem.id} className="pv3 bt b--gray-300">
            <div className="cf f6 avenir-roman gray-600">
              <h5 className="fl w-100 w-40-ns mb2 mb0-ns f6 lh-copy merriweather">
                {cartItem.tab_item.name}
              </h5>
              <div
                className={cx(
                  'fl w-100 w-15-ns mb1 mb0-ns',
                  cartItem.revised_quantity ? 'brand' : ''
                )}
              >
                {cartItem.revised_quantity || `Qty: ${cartItem.quantity}`}
              </div>
              <div className="fl w-100 w-25-ns mb1 mb0-ns">
                {CartHelpers.getCartItemPrice(cartItem)}
              </div>
              <div className="fl w-third w-20-ns mv3 mv0-ns">
                {cartItem.tab_item.images.length !== 0 && (
                  <img
                    className="w-100"
                    alt={cartItem.tab_item.name}
                    src={ImagesUtils.getItemMainThumbnailUrl(
                      cartItem.tab_item.images,
                      {width: 240, height: 240}
                    )}
                  />
                )}
              </div>
            </div>
            {cartItem.tab_item.options.recurring &&
              cartItem.tab_item.options.recurring.enabled && (
                <p className="flex items-center mt3 f6 avenir-roman gray-550">
                  <IoMdSync className="mr2 f5 brand" />
                  This is a recurring payment.
                </p>
              )}
            {cartItem.cart_field_views.length !== 0 && (
              <CarItemVariantsAndFieldViews
                className="mt3 mt2-ns"
                cartFieldViews={cartItem.cart_field_views}
              />
            )}
            <div className="flex w-100 pv2">
              <Touchable
                className="fl mr3 ba b--gray-300 gray-600 bg-white"
                size="SMALL"
                loading={deleting === cartItem.id}
                onClick={() => handleDelete(cartItem.id)}
              >
                Remove
              </Touchable>
            </div>
          </li>
        ))}
      </ul>
      <div className="cf mt3 bt b--gray-300 pv2">
        <div className="fl w-30-ns h1" />
        <div className="fl w-60 w-30-ns f6 avenir-roman gray-550">
          Subtotal:
        </div>
        <div className="fl w-40 w-20-ns w-auto-ns f6 avenir-heavy gray-600">
          {currency(cart.subtotal + cart.totalDiscount)}
        </div>
      </div>
      {itemsRemoved && itemsRemoved.actions_taken && (
        <ul>
          {itemsRemoved.actions_taken.map((actionTaken, index) => {
            if (actionTaken.action === 'removed') {
              return (
                <li key={index}>
                  <div className="cf f6 pv4 ph4 mt2 avenir-roman gray-600 bg-gray-200">
                    <p className="brand">Item no longer available</p>
                    <h5 className="fl w-100 w-40-ns mb2 mb0-ns f6 lh-copy merriweather">
                      {actionTaken.item.tab_item.name}
                    </h5>
                    <h5 className="fl w-100 w-40-ns mb2 mb0-ns f6 lh-copy merriweather">
                      {actionTaken.item.tab_item.description}
                    </h5>
                  </div>
                </li>
              );
            }

            return null;
          })}
        </ul>
      )}
      <style jsx>{`
        @media (min-width: 30em) {
          .w-15-ns {
            width: 15%;
          }
          .w-55-ns {
            width: 55%;
          }
          .pv6rem-ns {
            padding-top: 5rem;
            padding-bottom: 6rem;
          }
        }
      `}</style>
    </div>
  );
};

const EnhancedCartOverview = React.memo(CartOverview);

export default EnhancedCartOverview;
