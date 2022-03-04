import {Link} from 'react-router-dom';
import React from 'react';

import {Button} from 'elements';

const MarketplaceSalesEmptyStateView = () => (
  <div className="flex flex-column items-center pa4 bg-white tc">
    <div className="measure-wide avenir-roman f4 lh-copy">
      You haven&apos;t shared any sales yet. If you have an active sale, go to
      the sale settings and toggle on the option to list it in the Internal
      Marketplace.
    </div>
    <Link className="mt4" to="/collections">
      <Button>See Your Sales</Button>
    </Link>
  </div>
);

const EnhancedMarketplaceSalesEmptyStateView = React.memo(
  MarketplaceSalesEmptyStateView
);

export default EnhancedMarketplaceSalesEmptyStateView;
