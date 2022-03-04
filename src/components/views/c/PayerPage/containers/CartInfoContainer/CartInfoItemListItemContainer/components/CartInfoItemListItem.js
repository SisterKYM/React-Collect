import {Link} from 'react-router-dom';
import React from 'react';

import {Touchable} from 'elements';
import {currency} from 'helpers/numbers';
import ImagesUtils from 'helpers/ImagesUtils';
import CartHelpers from 'helpers/CartHelpers';

import {CarItemVariantsAndFieldViews} from '../../../../../components';

const CartInfoItemListItem = ({
  hasEditableVariants,
  hasItemViewFieldViews,
  allowQuantity,
  deleting,
  cartItem,
  editTo,
  onDelete,
}) => (
  <li className="pv3 avenir-roman cart-info-list-item">
    <h4 className="mb2 f6 lh-copy merriweather gray-600">
      {cartItem.tab_item.name}
    </h4>
    <div className="flex items-center">
      <p className="flex-auto f6 gray-600">Qty: {cartItem.quantity}</p>
      <p className="f6 tr gray-600">
        {cartItem.tab_item.amount_type === 'fixed' &&
          Boolean(cartItem.tab_item.retailPrice) &&
          cartItem.amount !== cartItem.tab_item.retailPrice && (
            <span className="mr2 f6 avenir-light strike gray-400">
              {currency(cartItem.tab_item.retailPrice)}
            </span>
          )}
        <span className="f6 avenir-roman gray-600">
          {CartHelpers.getCartItemPrice(cartItem)}
        </span>
      </p>
    </div>
    <CarItemVariantsAndFieldViews
      className="mt2"
      variantOptionValues={Object.keys(
        (cartItem.detail &&
          cartItem.detail.variant &&
          cartItem.detail.variant.optionValues) ||
          {}
      ).map((key) => ({key, value: cartItem.detail.variant.optionValues[key]}))}
      cartFieldViews={cartItem.cart_field_views}
    />
    {cartItem.tab_item.images.length !== 0 && (
      <img
        className="mt2 w3"
        alt={cartItem.tab_item.name}
        src={ImagesUtils.getItemMainThumbnailUrl(
          cartItem.tab_item.images,
          {
            width: 240,
            height: 240,
          },
          (cartItem.detail &&
            cartItem.detail.variant &&
            cartItem.detail.variant.imageId) ||
            undefined
        )}
      />
    )}
    <div className="cf mt3">
      <Touchable
        className="fl mr3 ba b--gray-300 gray-600 bg-white"
        size="SMALL"
        loading={deleting}
        onClick={onDelete}
      >
        Remove
      </Touchable>
      {(allowQuantity ||
        cartItem.tab_item.amount_type === 'open' ||
        hasItemViewFieldViews ||
        hasEditableVariants) && (
        <Link to={editTo}>
          <Touchable className="fl gray-600 bg-gray-200" size="SMALL">
            Edit
          </Touchable>
        </Link>
      )}
    </div>
    <style jsx>{`
      dl {
        font-size: 0.8125rem;
      }
      .cart-info-list-item:not(:last-child) {
        border-bottom: 1px solid;
        border-color: #dedede;
      }
    `}</style>
  </li>
);

const EnhancedCartInfoItemListItem = React.memo(CartInfoItemListItem);

export default EnhancedCartInfoItemListItem;
