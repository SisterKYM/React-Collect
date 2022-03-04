import {Link} from 'react-router-dom';
import React from 'react';

import {ReactComponent as PlanePlusSolidIcon} from 'theme/images/plane-plus-solid-icon.svg';
import {collectionsPathHelper} from 'helpers';
import config from 'config';

const NoPayments = ({collection}) => (
  <div className="pv5 tc">
    <h2 className="avenir-light dark-grey">
      You don&apos;t have any shipments.
      <br />
      Share your {config.strings.collection}!
    </h2>
    <Link to={collectionsPathHelper(collection, 'share')}>
      <PlanePlusSolidIcon
        className="plane-plus-solid-icon mt4"
        fill={config.colors.brand}
      />
      <style jsx>{`
        :global(.plane-plus-solid-icon) {
          width: 6.25rem;
        }
      `}</style>
    </Link>
  </div>
);

const EnhancedNoPayments = React.memo(NoPayments);

export default EnhancedNoPayments;
