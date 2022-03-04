import {compose} from 'recompose';
import {useDispatch} from 'react-redux';
import {useFetcher} from 'rest-hooks';
import React from 'react';

import {errorAlert} from 'redux/modules/growl/actions';
import {readApiError} from 'helpers/apiResponseHelpers';
import CartItemResource from 'resources/CartItemResource';

import {ItemViewListItem} from './components';

const ItemViewListItemContainer = (
  {
    className,
    collectionSlug,
    cartUuid,
    highlighted,
    to,
    itemView,
    onDidAddToCart,
  },
  ref
) => {
  const createCartItem = useFetcher(CartItemResource.createShape());
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await createCartItem(
        {collectionSlug, cartUuid},
        {
          item_id: itemView.id,
          quantity: 1,
        }
      );

      onDidAddToCart();
    } catch (err) {
      const errorCode = readApiError(err, {
        exceeded_available_quantity: () => 'exceeded_available_quantity',
      });

      if (errorCode === 'exceeded_available_quantity') {
        dispatch(
          errorAlert({
            title: 'Sorry',
            body: `Sorry, ${itemView.name} is no longer available`,
          })
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ItemViewListItem
      ref={ref}
      className={className}
      loading={loading}
      highlighted={highlighted}
      to={to}
      itemView={itemView}
      onAddToCart={handleAddToCart}
    />
  );
};

const enhance = compose(React.memo, React.forwardRef);

const EnhancedItemViewListItemContainer = enhance(ItemViewListItemContainer);

export default EnhancedItemViewListItemContainer;
