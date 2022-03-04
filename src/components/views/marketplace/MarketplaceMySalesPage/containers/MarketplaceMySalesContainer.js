import {useSelector} from 'react-redux';
import {useSuspenseQuery} from 'react-fetching-library';
import React from 'react';
import _ from 'lodash';

import {StatefulList} from 'elements';
import {createGetCollectionsQuery} from 'queryCreators';

import {
  MarketplaceSalesEmptyStateView,
  MarketplaceSalesItem,
  MarketplaceSectionTitle,
} from '../../components';

const renderEmptyStateView = () => <MarketplaceSalesEmptyStateView />;

const MarketplaceSalesContainer = () => {
  const [expandedOrganizerIds, setExpandedOrganizerIds] = React.useState([]);
  const currentUser = useSelector((state) => state.session.user);

  const fetchCollectionsQuery = React.useMemo(createGetCollectionsQuery, []);
  const fetchCollectionsQueryConfig = useSuspenseQuery(fetchCollectionsQuery);

  const internalMarketplaceEnabledCollections = React.useMemo(
    () =>
      (fetchCollectionsQueryConfig.payload || []).filter(
        (collection) =>
          collection.options &&
          collection.options.internalMarketplace &&
          collection.options.internalMarketplace.enabled
      ),
    [fetchCollectionsQueryConfig.payload]
  );

  const organizers = React.useMemo(
    () =>
      internalMarketplaceEnabledCollections.length !== 0
        ? [
            {
              id: currentUser.id,
              display_name: currentUser.display_name,
              first_name: currentUser.first_name,
              last_name: currentUser.last_name,
              profilePic: currentUser.profile_pic,
              collections: internalMarketplaceEnabledCollections,
            },
          ]
        : [],
    [currentUser, internalMarketplaceEnabledCollections]
  );

  const renderItem = React.useCallback(
    (organizer, idx) => {
      const handleExpandCollapse = () => {
        setExpandedOrganizerIds((prevExpandedOrganizerIds) =>
          prevExpandedOrganizerIds.includes(organizer.id)
            ? _.without(prevExpandedOrganizerIds, organizer.id)
            : [...prevExpandedOrganizerIds, organizer.id]
        );
      };

      return (
        <MarketplaceSalesItem
          key={organizer.id}
          className={idx === 0 ? '' : 'mt3'}
          expanded={expandedOrganizerIds.includes(organizer.id)}
          organizer={organizer}
          onExpandCollapse={handleExpandCollapse}
        />
      );
    },
    [expandedOrganizerIds]
  );

  return (
    <>
      <MarketplaceSectionTitle>My Sales</MarketplaceSectionTitle>
      <StatefulList
        className="mt3"
        loading={fetchCollectionsQueryConfig.loading}
        items={organizers}
        renderItem={renderItem}
        renderEmptyStateView={renderEmptyStateView}
      />
    </>
  );
};

const EnhancedMarketplaceSalesContainer = React.memo(MarketplaceSalesContainer);

export default EnhancedMarketplaceSalesContainer;
