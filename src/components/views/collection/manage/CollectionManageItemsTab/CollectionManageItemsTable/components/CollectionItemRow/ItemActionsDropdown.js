import React from 'react';
import _ from 'lodash';

import {RowControls} from 'elements';

const ItemActionsDropdown = ({className, onEditItem, onReportItem}) => {
  const controls = React.useMemo(
    () =>
      _.compact([
        {
          tooltip: 'Edit Item',
          onClick: onEditItem,
        },
        {
          tooltip: 'Item Report',
          onClick: onReportItem,
        },
      ]),
    [onEditItem, onReportItem]
  );

  return (
    <RowControls
      className={className}
      dropdownWidth={240}
      controls={controls}
    />
  );
};

export default ItemActionsDropdown;
