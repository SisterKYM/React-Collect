import {Link} from 'react-router-dom';
import cx from 'classnames';
import React from 'react';

import {DragHandle, Tooltip, Touchable} from 'elements';
import {dragHandle} from 'theme/sortable';
import {ReactComponent as ArrowUpIcon} from 'theme/images/arrow-up.svg';
import {ReactComponent as ComposeIcon} from 'theme/images/compose.svg';
import {ReactComponent as TrashIcon} from 'theme/images/trash.svg';

const ItemsListCategoryHeader = ({
  collection,
  category,
  expanded,
  onChangeExpanded,
}) => (
  <div className="relative flex justify-between items-center">
    <div className="flex items-center">
      <DragHandle className="dn db-ns" iconClassName={cx('f3', dragHandle)} />
      <div className="ml3-ns f-regular avenir-roman gray-600">
        {category.name}
      </div>
    </div>
    <div className="flex justify-end items-center">
      <div className="mr3 pointer">
        <Link
          to={`/collection/${collection.user_id}/${collection.id}/items/category/${category.id}/delete`}
        >
          <Tooltip
            style={{
              bottom: 40,
              left: -86,
              width: 205,
              zIndex: 2,
            }}
            text="Delete this category and all items in it"
          >
            <Touchable className="touchable-wrapper w2 h2 tc v-mid bg-white ba b--gray-300 flex justify-center items-center">
              <TrashIcon className="w1 f3 gray-400" />
            </Touchable>
          </Tooltip>
        </Link>
      </div>
      <div className="mr3 pointer">
        <Link
          to={`/collection/${collection.user_id}/${collection.id}/items/category/${category.id}`}
        >
          <Tooltip
            style={{
              bottom: 40,
              left: -86,
              width: 205,
              zIndex: 2,
            }}
            text="Edit category"
          >
            <Touchable className="touchable-wrapper w2 h2 bg-white ba b--gray-300 flex justify-center items-center">
              <ComposeIcon className="w1 f3 gray-400" />
            </Touchable>
          </Tooltip>
        </Link>
      </div>
      <Touchable
        className="bg-transparent"
        onClick={() => {
          onChangeExpanded(!expanded);
        }}
      >
        <ArrowUpIcon className={expanded ? '' : 'arrow-up-rotated'} />
      </Touchable>
    </div>
    <style jsx>{`
      :global(.touchable-wrapper.touchable-wrapper) {
        padding: 0rem;
      }
      :global(.arrow-up-rotated) {
        transform: rotate(180deg);
      }
      .items-list-category-header-minimize {
        line-height: 0px;
      }
    `}</style>
  </div>
);

export default ItemsListCategoryHeader;
