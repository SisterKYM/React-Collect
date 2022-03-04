import React from 'react';

import {currency} from 'helpers/numbers';

const CollectionPaymentsStatsMethod = ({
  cash,
  title,
  value,
  cleared,
  pending,
}) => (
  <>
    <p className="f7 avenir-roman dark-grey">
      {title}: {currency(value)}
    </p>
    <p className="f7 avenir-light gray-500">
      {cash ? 'Received' : 'Cleared'}: {currency(cleared)} | Pending:{' '}
      {currency(pending)}
    </p>
  </>
);

const EnhancedCollectionPaymentsStatsMethod = React.memo(
  CollectionPaymentsStatsMethod
);

export default EnhancedCollectionPaymentsStatsMethod;
