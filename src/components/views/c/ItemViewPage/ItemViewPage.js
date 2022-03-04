import {generatePath} from 'react-router-dom';
import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {Modal, RecurringInfo} from 'elements';
import parseNumberValue from 'helpers/parseNumberValue';

import {AddToCartButtonContainer} from './containers';
import {FieldViews} from '../components';
import {
  ItemViewHeader,
  ItemViewImageGallery,
  ItemViewOverview,
  ItemViewQuantityInputSection,
  ItemViewVariants,
} from './components';

const ItemViewPage = ({
  match,
  location,
  history,
  addPayment,
  publicCollection,
  cart,
  toggleCartVisible,
  categoryPath,
}) => {
  const collectionSlug = match.params.collection;
  const itemViewId = Number(match.params.item);
  const itemViewIdIndex = publicCollection.orderedItemsArray.findIndex(
    (id) => id === itemViewId
  );
  const cartItem = (location.state && location.state.cartItem) || null;

  const filteredItemViews = React.useMemo(() => {
    const [categoryId, subcategoryId] = categoryPath;

    return categoryId
      ? publicCollection.items.filter(
          (itemView) =>
            itemView.parent_id === categoryId &&
            (!subcategoryId || itemView.options.subcategoryId === subcategoryId)
        )
      : publicCollection.items || [];
  }, [publicCollection.items, categoryPath]);
  const itemViewIdx = filteredItemViews.findIndex(({id}) => id === itemViewId);
  const itemView = filteredItemViews[itemViewIdx];
  const hasImages = itemView.images.length !== 0;

  const [errorMessages, setErrorMessages] = React.useState({
    amount: '',
    quantity: '',
  });
  const [quantity, setQuantity] = React.useState(
    cartItem ? String(cartItem.quantity) : '1'
  );
  const [amount, setAmount] = React.useState(cartItem ? cartItem.amount : '');
  const [fieldViewsValue, setFieldViewsValue] = React.useState(() =>
    _.fromPairs(
      cartItem
        ? cartItem.cart_field_views.map(({item_field_id, value}) => [
            item_field_id,
            value,
          ])
        : itemView.fields.map(({id, field_type}) => [
            id,
            field_type === 'date' ? null : '',
          ])
    )
  );
  const [listingUuid, setListingUuid] = React.useState(
    () =>
      (cartItem &&
        cartItem.detail &&
        cartItem.detail.variant &&
        cartItem.detail.variant.uuid) ||
      null
  );

  const listings =
    (itemView.options.variants &&
      itemView.options.variants.enabled &&
      itemView.options.variants.listings) ||
    [];

  const listing = listings.find(({uuid}) => uuid === listingUuid) || null;
  const dismissTo = {
    pathname: generatePath('/c/:collection', {
      collection: collectionSlug,
    }),
  };

  React.useEffect(() => {
    if (!itemView) {
      handleDismiss();
    }
  }, [itemView, handleDismiss]);

  React.useEffect(() => {
    if (amount) {
      setErrorMessages(Object.assign(errorMessages, {amount: ''}));
    }
  }, [amount, errorMessages]);

  const handleDismiss = React.useCallback(() => {
    toggleCartVisible.off();

    history.push(dismissTo);
  }, [history, dismissTo, toggleCartVisible]);

  return (
    <Modal
      flexibleHeight
      className="flex flex-column item-view-modal h-100 h-auto-ns br2-ns"
      contentContainerClassName="top-0 bottom-0"
      size={hasImages ? 'LARGE' : 'SMALL'}
      onDismiss={handleDismiss}
    >
      <ItemViewHeader
        collectionSlug={collectionSlug}
        dismissTo={dismissTo}
        prevItemViewId={
          itemViewIdIndex === 0
            ? null
            : publicCollection.orderedItemsArray[itemViewIdIndex - 1]
        }
        nextItemViewId={
          itemViewIdIndex === publicCollection.orderedItemsArray.length - 1
            ? null
            : publicCollection.orderedItemsArray[itemViewIdIndex + 1]
        }
      />
      <main className="cf flex-auto">
        {hasImages && (
          <ItemViewImageGallery
            className="fl w-100 w-40-ns pa3 pa4-ns"
            listing={listing}
            images={itemView.images}
          />
        )}
        <div
          className={cx('flex flex-column', hasImages && 'fl w-100 w-60-ns')}
        >
          <ItemViewOverview
            itemView={itemView}
            listing={listing}
            errorMessage={errorMessages.amount}
            amount={amount}
            onChangeAmount={setAmount}
          />
          {itemView.options.recurring && itemView.options.recurring.enabled && (
            <div className="ph3 ph4-ns">
              <RecurringInfo
                className="pv4 bb b--gray-300"
                data={itemView.options.recurring.options}
              />
            </div>
          )}
          {((itemView.allow_quantity && itemView.available_quantity !== 0) ||
            (listing && listing.available_quantity > 1)) && (
            <ItemViewQuantityInputSection
              itemView={itemView}
              listing={listing}
              value={quantity}
              onChangeValue={setQuantity}
              errorMessage={errorMessages.quantity}
              setErrorMessage={(message) => {
                setErrorMessages({
                  ...errorMessages,
                  quantity: message,
                });
              }}
            />
          )}
          {listings.length !== 0 && (
            <ItemViewVariants
              className="ph3 ph4-ns"
              hideSoldOutItems={publicCollection.hideSoldOutItems}
              options={itemView.options.variants.options}
              initialOptionValues={listing ? listing.optionValues : null}
              listings={listings}
              onChangeListingUuid={setListingUuid}
            />
          )}
          {itemView.fields.length !== 0 && (
            <div className="ph3 ph4-ns">
              {itemView.fields.some(({required}) => required) && (
                <div
                  className={cx(
                    'mt3 f6',
                    Object.values(errorMessages).filter(Boolean).length === 0
                      ? 'gray-400'
                      : 'brand'
                  )}
                >
                  *Required
                </div>
              )}
              <FieldViews
                contentContainerClassName="pv4 b--gray-300"
                fieldViews={itemView.fields}
                errorMessages={errorMessages}
                value={fieldViewsValue}
                onChangeErrorMessages={(err) => {
                  setErrorMessages({
                    ...errorMessages,
                    ...err,
                  });
                }}
                onChangeValue={setFieldViewsValue}
              />
            </div>
          )}
        </div>
      </main>
      {cart && (
        <AddToCartButtonContainer
          className="pa3 pa4-ns bt b--gray-300"
          collectionSlug={collectionSlug}
          cartUuid={cart.uuid}
          cartItemId={cartItem ? cartItem.id : null}
          addPayment={addPayment}
          itemView={itemView}
          listing={listing}
          quantity={parseNumberValue(quantity, {float: false})}
          amount={amount}
          fieldViewsValue={fieldViewsValue}
          onChangeFieldErrorMessages={setErrorMessages}
          onDidAdd={() => {
            toggleCartVisible.on();

            history.push(dismissTo);
          }}
        />
      )}
      <style jsx>{`
        :global(.item-view-modal::-webkit-scrollbar) {
          display: none;
        }
        @media (min-width: 30em) {
          :global(.item-view-modal) {
            max-height: 100vh;
            height: 42rem !important;
          }
        }
        main {
          overflow: auto;
        }
      `}</style>
    </Modal>
  );
};

const EnhancedItemViewPage = React.memo(ItemViewPage);

export default EnhancedItemViewPage;
