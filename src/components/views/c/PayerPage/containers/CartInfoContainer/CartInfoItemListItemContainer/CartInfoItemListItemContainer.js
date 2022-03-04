import {generatePath} from 'react-router-dom';
import {useFetcher} from 'rest-hooks';
import React from 'react';

import CartItemResource from 'resources/CartItemResource';

import {CartInfoItemListItem} from './components';

const CartInfoItemListItemContainer = ({
  collectionSlug,
  allowQuantity,
  cartUuid,
  hasItemViewFieldViews,
  hasEditableVariants,
  cartItem,
}) => {
  const deleteCartItem = useFetcher(CartItemResource.deleteShape());

  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = React.useCallback(async () => {
    setDeleting(true);

    await deleteCartItem({collectionSlug, cartUuid, uuid: cartItem.id});
  }, [cartItem.id, collectionSlug, cartUuid, deleteCartItem]);

  return (
    <CartInfoItemListItem
      hasItemViewFieldViews={hasItemViewFieldViews}
      hasEditableVariants={hasEditableVariants}
      allowQuantity={allowQuantity}
      deleting={deleting}
      cartItem={cartItem}
      editTo={{
        pathname: generatePath('/c/:collection/item/:item', {
          collection: collectionSlug,
          item: cartItem.tab_item.id,
        }),
        state: {cartItem},
      }}
      onDelete={handleDelete}
    />
  );
};

const EnhancedCartInfoItemListItemContainer = React.memo(
  CartInfoItemListItemContainer
);

export default EnhancedCartInfoItemListItemContainer;
