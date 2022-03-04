import _ from 'lodash';
import React from 'react';

import {CartInfo} from './components';
import CartInfoItemListItemContainer from './CartInfoItemListItemContainer';

const CartInfoContainer = ({
  visible,
  collectionSlug,
  publicCollection,
  cart,
  missingRequiredItemViews,
  onViewRequiredItems,
  onProceed,
  onDismiss,
}) => (
  <CartInfo
    visible={visible}
    showEmpty={cart.items.length === 0 && cart.forms.length === 0}
    cart={cart}
    proceedButtonTitle={
      publicCollection.forms.length === 0 ? 'Checkout' : 'Continue to Forms'
    }
    noForms={publicCollection.forms.length === 0}
    missingRequiredItemViews={missingRequiredItemViews}
    renderCartItemListItem={(cartItem) => {
      const itemView = publicCollection.items.find(
        ({id}) => id === cartItem.tab_item.id
      );
      const hasEditableVariants =
        itemView &&
        _.some(
          itemView.options.variants &&
            itemView.options.variants.enabled &&
            itemView.options.variants.options,
          ({values}) => values.length > 1
        );

      return (
        <CartInfoItemListItemContainer
          key={cartItem.id}
          cartUuid={cart.uuid}
          collectionSlug={collectionSlug}
          allowQuantity={itemView && itemView.allow_quantity}
          hasItemViewFieldViews={itemView && itemView.fields.length !== 0}
          hasEditableVariants={hasEditableVariants}
          cartItem={cartItem}
        />
      );
    }}
    onViewRequiredItems={onViewRequiredItems}
    onProceed={onProceed}
    onDismiss={onDismiss}
  />
);

const EnhancedCartInfoContainer = React.memo(CartInfoContainer);

export default EnhancedCartInfoContainer;
