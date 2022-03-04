import React from 'react';

import {ReactComponent as DownloadIcon} from 'theme/images/download.svg';
import apiClient from 'helpers/apiClient';

import {ItemsToolbarButton} from './components';

const ItemsReportButtonContainer = ({className, collection}) => (
  <ItemsToolbarButton
    className={className}
    onClick={() => {
      apiClient.fetchAndSave({
        url: `users/tabs/${collection.id}/exports/items.xlsx`,
        fileName: `${collection.name}-items.xlsx`,
      });
    }}
  >
    <DownloadIcon className="dib v-mid" />{' '}
    <span className="dn di-ns ml2 v-mid">Items Report</span>
  </ItemsToolbarButton>
);

const EnhancedItemsReportButtonContainer = React.memo(
  ItemsReportButtonContainer
);

export default EnhancedItemsReportButtonContainer;
