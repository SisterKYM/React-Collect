import React from 'react';
import cx from 'classnames';

const ItemVariantsListingModalWrapper = ({className, children}) => (
  <div
    className={cx(
      className,
      'fixed top-0 left-0 right-0 bottom-0 z-9999 flex items-center justify-center'
    )}
  >
    {children}
  </div>
);

const EnhancedItemVariantsListingModalWrapper = React.memo(
  ItemVariantsListingModalWrapper
);

export default EnhancedItemVariantsListingModalWrapper;
