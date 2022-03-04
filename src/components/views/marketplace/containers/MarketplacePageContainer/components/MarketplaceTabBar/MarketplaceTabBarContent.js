import React from 'react';

import {MarketplaceHeading} from 'elements';

import MarketplaceSearchBar from './MarketplaceSearchBar';
import MarketplaceTabBarNav from './MarketplaceTabBarNav';

const MarketplaceTabBarContent = ({
  activePath,
  initialSearchBy,
  marketplaceName,
  navigationLinks,
  onSubmitSearchForm,
}) => (
  <div className="dn flex-l h-100 ph3 justify-between items-center">
    <MarketplaceHeading
      text={`${marketplaceName} Marketplace`}
      className="w-20"
    />
    <MarketplaceTabBarNav
      className="w-50"
      activePath={activePath}
      navigationLinks={navigationLinks}
    />
    <MarketplaceSearchBar
      className="search-form mw5 mw6-l w-30"
      initialSearchBy={initialSearchBy}
      marketplaceName={marketplaceName}
      onSubmit={onSubmitSearchForm}
    />
    <style jsx>{`
      :global(.search-form) {
        margin-right: 2.8rem;
      }
    `}</style>
  </div>
);

const EnhancedMarketplaceTabBarContent = React.memo(MarketplaceTabBarContent);

export default EnhancedMarketplaceTabBarContent;
