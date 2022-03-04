import React from 'react';
import cx from 'classnames';

import {ReactComponent as MoveIcon} from 'theme/images/Move.svg';
import {Tooltip} from 'elements';
import config from 'config';

const CollectionObjectFieldValueWrapper = ({
  sortClassName,
  backgroundTransparent,
  inactive,
  noHorizontalMargin,
  onClick,
  children,
}) => (
  <div
    className={cx(
      'container w-100 flex items-center br2',
      inactive && 'container-inactive',
      !backgroundTransparent && 'bg-light-tint'
    )}
    style={{padding: '12px 0'}}
    onClick={onClick}
  >
    {sortClassName && (
      <Tooltip
        contentContainerClassName="collection-object-field-value-wrapper-tooltip"
        arrowPosition={18}
        text="Drag to reorder"
      >
        <div className={sortClassName}>
          <MoveIcon
            id="drag-icon"
            className="ph3 pointer"
            fill={config.colors.tint}
          />
        </div>
      </Tooltip>
    )}
    <div className={cx('mw-100 flex-auto', !noHorizontalMargin && 'mr3')}>
      {children}
    </div>
    <style jsx>{`
      .container:hover :global(#drag-icon) {
        visibility: visible;
      }
      .container-inactive {
        pointer-events: none;
      }
      :global(#drag-icon) {
        height: 20px;
        visibility: hidden;
      }
      :global(.collection-object-field-value-wrapper-tooltip) {
        bottom: 40px;
        width: 100px;
        z-index: 1;
      }
    `}</style>
  </div>
);

const EnhancedCollectionObjectFieldValueWrapper = React.memo(
  CollectionObjectFieldValueWrapper
);

export default EnhancedCollectionObjectFieldValueWrapper;
