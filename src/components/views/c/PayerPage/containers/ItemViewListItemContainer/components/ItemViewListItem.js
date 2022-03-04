import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import cx from 'classnames';
import React from 'react';

import {ItemViewPrice, MarkdownParagraph, Touchable} from 'elements';
import ImagesUtils from 'helpers/ImagesUtils';

const ItemViewListItem = (
  {className, loading, highlighted, itemView, to, onAddToCart},
  ref
) => {
  const hasImages = itemView.images.length !== 0;
  const lowestAmountListing = React.useMemo(
    () =>
      _.minBy(
        (itemView.options.variants &&
          itemView.options.variants.enabled &&
          itemView.options.variants.listings) ||
          [],
        'amount'
      ),
    [itemView]
  );
  const linksToItemViewPage =
    itemView.amount_type !== 'fixed' ||
    itemView.allow_quantity ||
    hasImages ||
    itemView.description ||
    (itemView.options.recurring && itemView.options.recurring.enabled) ||
    lowestAmountListing ||
    itemView.fields.length !== 0;
  const soldOut =
    itemView.options.variants && itemView.options.variants.enabled
      ? Math.max(
          ...itemView.options.variants.listings.map(
            (listing) => listing.available_quantity
          )
        ) === 0
      : itemView.available_quantity === 0;
  const withDifferentRetailPrices = React.useMemo(
    () =>
      itemView.options.variants &&
      itemView.options.variants.enabled &&
      itemView.options.variants.listings &&
      itemView.options.variants.listings.length > 1 &&
      itemView.options.variants.listings.some(
        (listing, idx, listings) =>
          listing.retailPrice - listings[0].retailPrice !== 0
      ),
    [itemView]
  );
  const withDifferentAmounts = React.useMemo(
    () =>
      itemView.options.variants &&
      itemView.options.variants.enabled &&
      itemView.options.variants.listings &&
      itemView.options.variants.listings.length > 1 &&
      itemView.options.variants.listings.some(
        (listing, idx, listings) => listing.amount - listings[0].amount !== 0
      ),
    [itemView]
  );

  const handleClick = () => {
    if (!linksToItemViewPage && !loading && !soldOut) {
      onAddToCart();
    }
  };

  const addToCartButton = (
    <div className="flex db-ns items-center">
      <Touchable
        className={cx(
          'add-to-cart-button pv2 f6',
          soldOut ? 'gray-600 bg-gray-300' : 'white bg-tint'
        )}
        loading={loading}
      >
        {(() => {
          if (soldOut) {
            return 'Sold Out';
          }

          return !lowestAmountListing && itemView.amount_type === 'open'
            ? 'Enter Amount'
            : 'Add to Cart';
        })()}
      </Touchable>
      {!lowestAmountListing &&
        itemView.options.makeAvailableQuantityPublic &&
        itemView.available_quantity !== null && (
          <div className="mt2-ns ml3 ml0-ns f6 tc avenir-roman brand">
            {itemView.available_quantity} Left
          </div>
        )}
    </div>
  );

  return (
    <li
      ref={ref}
      className={cx(
        'br2 ba overflow-hidden',
        highlighted ? 'b--brand' : 'b--gray-300',
        !linksToItemViewPage && (soldOut ? 'not-allowed' : 'pointer'),
        className
      )}
      onClick={handleClick}
    >
      <Link
        className={cx('flex', !linksToItemViewPage && 'link-disabled')}
        to={to}
      >
        <div className="flex flex-column flex-auto flex-basis-0 justify-between pa3">
          <div className="flex flex-column h-100 justify-between f6">
            <div>
              <h5 className="f5 merriweather lh-title gray-600 truncate">
                {itemView.name}
              </h5>
              {itemView.required && (
                <div className="mt2 avenir-roman brand">Required</div>
              )}
              <ItemViewPrice
                className="mt2"
                itemView={itemView}
                listing={lowestAmountListing}
                withDifferentRetailPrices={withDifferentRetailPrices}
                withDifferentAmounts={withDifferentAmounts}
              />
            </div>
            {itemView.description
              ? itemView.description.length > 2 && (
                  <div className={cx('dn db-ns', hasImages ? '' : 'mt3')}>
                    <MarkdownParagraph
                      className={cx(
                        'item-view-list-item-markdown-paragraph mr3 f6 avenir-light truncate gray-600',
                        hasImages && 'mw-none-ns'
                      )}
                      markdown={itemView.description}
                    />
                    <div className="f6 avenir-light tint">more</div>
                  </div>
                )
              : null}
          </div>
          <div className="dn-ns mt3">{addToCartButton}</div>
        </div>
        {hasImages && (
          <img
            className="w-40 w-20-ns"
            alt={itemView.name}
            src={ImagesUtils.getItemMainThumbnailUrl(itemView.images, {
              width: 300,
              height: 300,
            })}
          />
        )}
        <div className="dn flex-ns w-20 flex-column pa3 justify-center items-center bl b--gray-300">
          {addToCartButton}
        </div>
      </Link>
      <style jsx>{`
        img {
          max-width: 10rem;
          max-height: 10rem;
          object-fit: cover;
          object-position: center;
        }
        .flex-basis-0 {
          flex-basis: 0;
        }
        :global(.link-disabled) {
          pointer-events: none;
        }
        :global(.add-to-cart-button) {
          width: 8.5rem;
        }
        :global(.item-view-list-item-markdown-paragraph) {
          max-height: 1rem;
        }
      `}</style>
    </li>
  );
};

const enhance = compose(React.memo, React.forwardRef);

const EnhancedItemViewListItem = enhance(ItemViewListItem);

export default EnhancedItemViewListItem;
