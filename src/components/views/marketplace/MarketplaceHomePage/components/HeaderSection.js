import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {MarketplaceSectionTitle} from '../../components';

const HeaderSection = ({className}) => {
  const marketplaceName = useSelector(
    (state) =>
      state.session?.organization_data?.internalMarketplace
        ?.organizerNickname || ''
  );

  return (
    <div className={className}>
      <div className="flex items-center hide-child">
        <MarketplaceSectionTitle>Welcome!</MarketplaceSectionTitle>
      </div>
      <div className="mt2 pt2 lh-copy">
        Here you can search for items in other {marketplaceName} sales. Find
        items you&apos;re looking for via the search field or by using the{' '}
        <Link to="/marketplace/shop-items">Shop Items</Link> or{' '}
        <Link to="/marketplace/sales">{marketplaceName} Sales</Link> views.
      </div>
      <div className="mt2 pt2 lh-copy">
        All sales are added here by default, but if you wish to not have your
        sale listed, simply toggle off &quot;{marketplaceName} Marketplace&quot;
        within your sale settings.
      </div>
      <style jsx>{`
        img {
          height: 1.75rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedHeaderSection = React.memo(HeaderSection);

export default EnhancedHeaderSection;
