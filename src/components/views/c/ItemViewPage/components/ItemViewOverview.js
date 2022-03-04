import React from 'react';

import {ItemViewPrice, MarkdownParagraph, TextInput} from 'elements';

const ItemViewOverview = ({
  itemView,
  listing,
  errorMessage,
  amount,
  onChangeAmount,
}) => (
  <div className="ph3 ph4-ns">
    <div className="cf pv3 bb b--gray-300">
      <h3 className="fl w-100 mb3 f3 lh-copy merriweather gray-600">
        {itemView.name}
      </h3>
      {listing || itemView.amount_type === 'fixed' ? (
        <ItemViewPrice
          className="fl w-100"
          itemView={itemView}
          listing={listing}
        />
      ) : (
        <TextInput
          inputClassName="amount-text-input"
          type="amount"
          value={amount}
          errorMessage={errorMessage}
          label="Enter Amount"
          placeholder="$0"
          onChange={(event) => {
            onChangeAmount(event.target.value);
          }}
        />
      )}
      {itemView.description && (
        <MarkdownParagraph
          id="item-view-markdown"
          className="fl mt4 f-regular avenir-light gray-600"
          markdown={itemView.description}
        />
      )}
    </div>
    <style jsx>{`
      :global(.amount-text-input) {
        width: 9rem !important;
      }
      :global(#item-view-markdown) {
        line-height: 1.5rem !important;
      }
    `}</style>
  </div>
);

const EnhancedItemViewOverview = React.memo(ItemViewOverview);

export default EnhancedItemViewOverview;
