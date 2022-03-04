import cx from 'classnames';
import React from 'react';

import {colors} from 'theme/constants';
import {Touchable} from 'elements';

const ItemsToolbarButton = ({className, loading, onClick, children}) => (
  <Touchable
    className={cx('toolbar-button dib bg-white ba b--gray-300', className)}
    loading={loading}
    size="SMALL"
    onClick={onClick}
  >
    {children}
    {/* a .toolbar-button – https://stackoverflow.com/questions/21329602/link-border-changing-color-on-ios */}
    <style jsx global>{`
      .toolbar-button {
        height: 1.875rem;
        line-height: 1rem;
        padding-top: unset !important;
        padding-bottom: unset !important;
      }
      a .toolbar-button {
        border-color: ${colors.gray};
      }
    `}</style>
  </Touchable>
);

const EnhancedItemsToolbarButton = React.memo(ItemsToolbarButton);

export default EnhancedItemsToolbarButton;
