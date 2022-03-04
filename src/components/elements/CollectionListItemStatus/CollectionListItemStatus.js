import React from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';

import CollectionListItemStatusTooltip from './CollectionListItemStatusTooltip';

const CollectionListItemStatus = ({collection}) => {
  const chargesEnabled = useSelector(
    (state) => state.session?.chargesEnabled || false
  );

  if (collection.closed_at) {
    collection.status = 'closed';

    return 'Closed';
  }

  if (!chargesEnabled) {
    collection.status = 'inactive';

    return (
      <CollectionListItemStatusTooltip
        text="Inactive"
        tooltipText="Complete your profile within account settings to reactivate this collection"
      />
    );
  }

  if (!collection.is_pro && collection.requires_pro) {
    collection.status = 'upgrade required';

    return (
      <CollectionListItemStatusTooltip
        text="Upgrade Required"
        tooltipText="This collection uses pro features. Upgrade now to reactivate this collection."
      />
    );
  }

  if (collection.timing?.opens && collection.timing?.closes) {
    const current = moment();
    const opens = moment(collection.timing.opens);
    const closes = moment(collection.timing.closes);

    collection.status = 'active';
    if (current <= opens) {
      return `Active: Opens ${opens.format('MM/DD/YY')}`;
    }
    if (closes <= current) {
      collection.status = 'closed';
      return `Closed: Ended ${closes.format('MM/DD/YY')}`;
    }
    return 'Active';
  }

  collection.status = 'active';

  return 'Active';
};

const EnhancedCollectionListItemStatus = React.memo(CollectionListItemStatus);

export default EnhancedCollectionListItemStatus;
