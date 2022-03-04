import {Link} from 'react-router-dom';
import React from 'react';

import {currency} from 'helpers/numbers';

const DisputesBanner = ({disputedCollection, totalDisputeAmount}) => (
  <div className="w-100 pv3 lh-copy tc white bg-brand">
    Collection Balance Alert: {currency(totalDisputeAmount)} is currently unable
    to be withdrawn due to a dispute.{' '}
    <Link
      to={`/collection/${disputedCollection.user_id}/${disputedCollection.id}/manage/i/collection/${disputedCollection.user_id}/${disputedCollection.id}/summary`}
    >
      <span className="white underline">Go to collection</span>
    </Link>
    .
  </div>
);

const EnhancedDisputesBanner = React.memo(DisputesBanner);

export default EnhancedDisputesBanner;
