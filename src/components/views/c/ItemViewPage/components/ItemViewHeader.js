import {generatePath, Link} from 'react-router-dom';
import {IoIosClose} from 'react-icons/io';
import React from 'react';

const ItemViewHeader = ({
  collectionSlug,
  dismissTo,
  prevItemViewId,
  nextItemViewId,
}) => {
  const getItemViewPagePath = itemViewId =>
    generatePath('/c/:collection/item/:item', {
      collection: collectionSlug,
      item: itemViewId,
    });

  return (
    <nav className="flex items-center justify-between justify-end-ns pt3 pb2 ph3 ph4-ns f6 avenir-roman gray-600">
      <div>
        {prevItemViewId && (
          <Link
            replace
            className="gray-600 dim"
            to={getItemViewPagePath(prevItemViewId)}
          >
            {'<'} Prev
          </Link>
        )}
        {prevItemViewId && nextItemViewId && <span className="mh2">|</span>}
        {nextItemViewId && (
          <Link
            replace
            className="gray-600 dim"
            to={getItemViewPagePath(nextItemViewId)}
          >
            Next {'>'}
          </Link>
        )}
      </div>
      <div className="dn-ns">
        <Link className="dim" to={dismissTo}>
          <IoIosClose className="f2 gray-400" />
        </Link>
      </div>
    </nav>
  );
};

const EnhancedItemViewHeader = React.memo(ItemViewHeader);

export default EnhancedItemViewHeader;
