import React, {useCallback, useMemo} from 'react';

import {Tooltip, Touchable} from 'elements';
import {ReactComponent as ArrowUpIcon} from 'theme/images/arrow-up.svg';
import {ReactComponent as ComposeIcon} from 'theme/images/compose.svg';
import {ReactComponent as TrashIcon} from 'theme/images/trash.svg';

const cashedTrashIcon = <TrashIcon className="w1 f3 gray-400" />;
const cashedComposeIcon = <ComposeIcon className="w1 f3 gray-400" />;

const tooltipStyle = {
  bottom: 40,
  left: -86,
  width: 205,
  zIndex: 2,
};

const CollectionListCategoryHeaderMobile = ({
  category,
  expanded,
  onChangeExpanded,
  removeCategory,
  editCategory,
}) => {
  const toggle = useCallback(() => {
    onChangeExpanded(!expanded);
  }, [expanded, onChangeExpanded]);

  const cashedArrowUpIcon = useMemo(
    () => <ArrowUpIcon className={expanded ? '' : 'arrow-up-rotated'} />,
    [expanded]
  );

  const cashedTouchableTrash = useMemo(
    () => (
      <Touchable
        className="touchable-wrapper w2 h2 tc v-mid bg-white ba b--gray-300 flex justify-center items-center"
        onClick={removeCategory}
      >
        {cashedTrashIcon}
      </Touchable>
    ),
    [removeCategory]
  );

  const cashedTouchableCompose = useMemo(
    () => (
      <Touchable
        className="touchable-wrapper w2 h2 bg-white ba b--gray-300 flex justify-center items-center"
        onClick={editCategory}
      >
        {cashedComposeIcon}
      </Touchable>
    ),
    [editCategory]
  );

  return (
    <div className="relative">
      <div className="mb3 flex justify-between">
        <div className="flex items-center">
          <div className="ml3-ns f-regular avenir-roman gray-600">
            {category.name}
          </div>
        </div>
        <div className="flex justify-end items-start">
          <Touchable className="bg-transparent" onClick={toggle}>
            {cashedArrowUpIcon}
          </Touchable>
        </div>
      </div>
      <div className="flex">
        <div className="mr3 pointer">
          <Tooltip
            style={tooltipStyle}
            text="Remove this category and all collections in it"
          >
            {cashedTouchableTrash}
          </Tooltip>
        </div>
        <div className="mr3 pointer">
          <Tooltip style={tooltipStyle} text="Edit category name">
            {cashedTouchableCompose}
          </Tooltip>
        </div>
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
};

export default CollectionListCategoryHeaderMobile;
