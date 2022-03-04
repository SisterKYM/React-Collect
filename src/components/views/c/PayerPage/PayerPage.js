import _ from 'lodash';
import {generatePath} from 'react-router-dom';
import {IoIosArrowRoundForward} from 'react-icons/io';
import {useSelector} from 'react-redux';
import React from 'react';

import {VerificationPrompt} from 'elements';
import CartHelpers from 'helpers/CartHelpers';

import {CartButtonMobile, CollectionOverview} from '../components';
import {CartInfoContainer, ItemViewListItemContainer} from './containers';
import {PayerPageBaseContainer} from '../containers';
import {
  ItemViewGridItem,
  ItemViewListPanel,
  PayerPageFiltersOverviewBar,
  PayerPageToolbar,
  PaymentsOverview,
} from './components';

const PayerPage = ({
  match,
  location,
  history,
  publicCollection,
  cart,
  cartVisible,
  toggleCartVisible,
  categoryPath,
  setCategoryPath,
}) => {
  const collectionSlug = match.params.collection;
  publicCollection.orderedItemsArray = [];
  const [displayMode, setDisplayMode] = React.useState(
    publicCollection && publicCollection.defaultToGalleryView ? 'GRID' : 'LIST'
  );
  const [
    missingItemViewsHighlighted,
    setMissingItemViewsHighlighted,
  ] = React.useState(false);
  const [selectedFilterValues, setSelectedFilterValues] = React.useState({});
  const [noItemsPromptVisible, setNoItemsPromptVisible] = React.useState(false);

  const userLoggedIn = useSelector((state) =>
    Boolean(state.session && state.session.user)
  );

  React.useEffect(() => {
    if (cart && cart.items) {
      setMissingItemViewsHighlighted(false);
    }
  }, [cart]);
  React.useEffect(() => {
    if (location.state && location.state.viewRequiredItems) {
      handleViewRequiredItems();
    }
  }, [location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  const visibleCategories =
    categoryPath.length === 0
      ? publicCollection.categories
      : [
          publicCollection.categories.find(
            (category) => category.id === categoryPath[0]
          ),
        ];
  const uncategorizedItemViews = publicCollection.items.filter(
    ({parent_id}) => !parent_id
  );

  const itemViewRefs = React.useMemo(
    () =>
      publicCollection.items.reduce(
        (acc, value) => ({
          ...acc,
          [value.id]: React.createRef(),
        }),
        {}
      ),
    [publicCollection.items]
  );

  const missingItemViewIds = CartHelpers.getMissingItemViewIds({
    cart,
    itemViews: publicCollection.items,
  });

  const handleViewRequiredItems = React.useCallback(() => {
    toggleCartVisible.off();
    setMissingItemViewsHighlighted(true);

    const firstMissingItemViewId = missingItemViewIds[0];

    itemViewRefs[firstMissingItemViewId].current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [itemViewRefs, missingItemViewIds, toggleCartVisible]);

  const handleDismissNoItemsPrompt = React.useCallback(() => {
    setNoItemsPromptVisible(false);
  }, []);

  const handleProceed = React.useCallback(() => {
    const getStep = () => {
      if (!formsEmpty) {
        return null;
      }

      const shippingEnabled = Boolean(
        publicCollection?.shippingOptions?.shipToEnabled
      );

      if (shippingEnabled) {
        return 'shipping';
      }

      return userLoggedIn ? 'payment' : 'details';
    };

    const formsEmpty = publicCollection.forms.length === 0;

    if (!formsEmpty && !noItemsPromptVisible && (cart?.itemCount || 0) === 0) {
      setNoItemsPromptVisible(true);
    } else {
      setNoItemsPromptVisible(false);

      const step = getStep();

      history.push({
        pathname: generatePath(
          formsEmpty ? '/c/:collection/checkout' : '/c/:collection/forms',
          {collection: collectionSlug}
        ),
        search: step ? `?step=${step}` : undefined,
      });
    }
  }, [
    cart,
    collectionSlug,
    history,
    publicCollection.forms.length,
    publicCollection.shippingOptions.shipToEnabled,
    userLoggedIn,
    noItemsPromptVisible,
  ]);

  const renderItemView = (itemView, idx) => {
    publicCollection.orderedItemsArray.push(itemView.id);
    const commonProps = {
      key: itemView.id,
      itemView,
      highlighted:
        missingItemViewsHighlighted && missingItemViewIds.includes(itemView.id),
      to: generatePath('/c/:collection/item/:item', {
        collection: collectionSlug,
        item: itemView.id,
      }),
    };

    return displayMode === 'LIST' ? (
      <ItemViewListItemContainer
        ref={itemViewRefs[itemView.id]}
        className={idx === 0 ? '' : 'mt3'}
        collectionSlug={collectionSlug}
        cartUuid={cart ? cart.uuid : null}
        onDidAddToCart={toggleCartVisible.on}
        {...commonProps}
      />
    ) : (
      <ItemViewGridItem
        ref={itemViewRefs[itemView.id]}
        className="fl w-50 w-third-m w-25-l pa1 pa2-ns"
        {...commonProps}
      />
    );
  };
  const cartElement = cart ? (
    <CartInfoContainer
      visible={cartVisible}
      collectionSlug={collectionSlug}
      publicCollection={publicCollection}
      cart={cart}
      missingRequiredItemViews={missingItemViewIds.length !== 0}
      onViewRequiredItems={handleViewRequiredItems}
      onProceed={handleProceed}
      onDismiss={toggleCartVisible.off}
    />
  ) : null;
  publicCollection.orderedItemsArray = [];

  return (
    <PayerPageBaseContainer
      collectionSlug={collectionSlug}
      publicCollection={publicCollection}
      onChangeCategoryPath={setCategoryPath}
      navigationBarRightElementMobile={
        <CartButtonMobile
          cart={cart}
          cartVisible={cartVisible}
          toggleCartVisible={toggleCartVisible}
          cartElement={cartElement}
        />
      }
      header={
        <div>
          {publicCollection.items && publicCollection.items.length !== 0 && (
            <PayerPageToolbar
              publicCollection={publicCollection}
              cart={cart}
              displayMode={displayMode}
              onChangeDisplayMode={setDisplayMode}
              categoryPath={categoryPath}
              onChangeCategoryPath={setCategoryPath}
              onResetCategoryPath={() => {
                setCategoryPath([]);
              }}
              selectedFilterValues={selectedFilterValues}
              onChangeSelectedFilterValues={setSelectedFilterValues}
              cartVisible={cartVisible}
              toggleCartVisible={toggleCartVisible}
              cartElement={cartElement}
            />
          )}
          {Object.keys(_.omitBy(selectedFilterValues, _.isEmpty)).length !==
            0 && (
            <PayerPageFiltersOverviewBar
              selectedFilterValues={selectedFilterValues}
              onChangeSelectedFilterValues={setSelectedFilterValues}
            />
          )}
        </div>
      }
    >
      <CollectionOverview
        publicCollection={publicCollection}
        collectionSlug={collectionSlug}
        path={match.path}
      />
      {(typeof publicCollection.totalCollected === 'number' ||
        (publicCollection.payers || []).length !== 0) && (
        <PaymentsOverview className="mt3" publicCollection={publicCollection} />
      )}
      {visibleCategories.map((category) => {
        const [, subcategoryId] = categoryPath;

        const filteredItemViews = publicCollection.items.filter((itemView) => {
          const allOptionValues =
            (itemView.options.variants &&
              itemView.options.variants.enabled &&
              itemView.options.variants.listings
                .filter((l) => l.available_quantity && l.available_quantity > 0)
                .map((listing) => listing.optionValues)) ||
            [];
          const selectedFilterValuesKeys = Object.keys(
            _.omitBy(selectedFilterValues, _.isEmpty)
          );

          const filtersSatisfied =
            selectedFilterValuesKeys.length === 0 ||
            _.some(allOptionValues, (optionValues) =>
              _.every(
                selectedFilterValuesKeys.map((key) => {
                  const selectedValues = selectedFilterValues[key];

                  return (
                    selectedValues.length === 0 ||
                    selectedValues.includes(optionValues[key])
                  );
                }),
                Boolean
              )
            );

          return (
            itemView.parent_id === category.id &&
            (!subcategoryId ||
              itemView.options.subcategoryId === subcategoryId) &&
            filtersSatisfied
          );
        });

        return filteredItemViews.length === 0 ? null : (
          <ItemViewListPanel
            key={category.id}
            className="mt3"
            category={category}
            itemViews={filteredItemViews}
            renderItemView={renderItemView}
          />
        );
      })}
      {categoryPath.length === 0 && uncategorizedItemViews.length !== 0 && (
        <ItemViewListPanel
          className="mt3"
          itemViews={uncategorizedItemViews}
          renderItemView={renderItemView}
        />
      )}
      {publicCollection?.forms?.length !== 0 &&
        missingItemViewIds.length === 0 && (
          <div className="pa3 ph4-ns mt3 bg-white">
            <a
              className="flex justify-end items-center pointer"
              onClick={handleProceed}
            >
              <span className="text-14 avenir-roman mr3 tint">
                Continue to forms
              </span>
              <IoIosArrowRoundForward className="tint f3" />
            </a>
          </div>
        )}
      {noItemsPromptVisible && (
        <VerificationPrompt
          flexibleHeight
          title="Are you sure?"
          description="You don’t have any items in your cart. Are you sure you’d like to proceed?"
          okButtonLabel="Continue to Forms"
          onOkButtonClick={handleProceed}
          cancelButtonLabel="Cancel"
          onCancelButtonClick={handleDismissNoItemsPrompt}
          onDismiss={handleDismissNoItemsPrompt}
        />
      )}
    </PayerPageBaseContainer>
  );
};

const EnhancedPayerPage = React.memo(PayerPage);

export default EnhancedPayerPage;
