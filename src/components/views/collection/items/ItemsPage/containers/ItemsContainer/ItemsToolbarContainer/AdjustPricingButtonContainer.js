import {generatePath, Link} from 'react-router-dom';
import React from 'react';

import {ReactComponent as PercentIcon} from 'theme/images/percent.svg';

import {ItemsToolbarButton} from './components';

const AdjustPricingButtonContainer = ({className, ownerId, collectionId}) => (
  <Link
    to={generatePath('/collection/:owner/:collection/items/adjust-pricing', {
      owner: ownerId,
      collection: collectionId,
    })}
  >
    <ItemsToolbarButton className={className}>
      <PercentIcon className="dib v-mid" />{' '}
      <span className="dn di-ns ml2 v-mid">Adjust Pricing</span>
    </ItemsToolbarButton>
  </Link>
);

const EnhancedAdjustPricingButtonContainer = React.memo(
  AdjustPricingButtonContainer
);

export default EnhancedAdjustPricingButtonContainer;
