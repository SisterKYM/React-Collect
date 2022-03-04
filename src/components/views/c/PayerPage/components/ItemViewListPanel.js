import cx from 'classnames';
import React from 'react';

import {MarkdownParagraph} from 'elements';

const ItemViewListPanel = ({
  className,
  category,
  itemViews,
  renderItemView,
}) => (
  <div className={cx('pa3 pa4-ns br2-ns bg-white shadow-6', className)}>
    {category && (
      <h3 className="mb3 mb4-ns f3 merriweather gray-600">{category.name}</h3>
    )}
    {category && category.description && (
      <MarkdownParagraph
        className="item-vite-list-panel-markdown-paragraph mb3 f-regular avenir-light gray-600"
        markdown={category.description}
      />
    )}
    <ul className="cf">{itemViews.map(renderItemView)}</ul>
    <style jsx>{`
      :global(.item-vite-list-panel-markdown-paragraph) {
        line-height: 1.5rem;
      }
    `}</style>
  </div>
);

const EnhancedItemViewListPanel = React.memo(ItemViewListPanel);

export default EnhancedItemViewListPanel;
