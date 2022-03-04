import {useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {StatefulList} from 'elements';
import {createGetMarketplaceOrganizersQuery} from 'queryCreators';
import usePagination from 'hooks/usePagination';

import {MarketplaceSalesItem, MarketplaceSectionTitle} from '../../components';

const MarketplaceSalesContainer = ({searchKeyword, sortBy}) => {
  const [expandedOrganizerIds, setExpandedOrganizerIds] = React.useState([]);

  const partnerId = useSelector(state =>
    state.session.organization_data ? state.session.organization_data.id : null
  );

  const createQuery = React.useCallback(
    ({page, perPage}) =>
      createGetMarketplaceOrganizersQuery({
        searchKeyword,
        partnerId,
        sortBy,
        page,
        perPage,
      }),
    [partnerId, searchKeyword, sortBy]
  );

  const {items, fetchMore, queryRes} = usePagination({createQuery}, [
    sortBy,
    searchKeyword,
  ]);
  const activeSales = React.useMemo(
    () =>
      items.filter(
        organizer => organizer.collections && organizer.collections.length !== 0
      ),
    [items]
  );

  const marketplaceName = useSelector(
    state =>
      _.get(
        state.session,
        'organization_data.internalMarketplace.organizerNickname'
      ) || ''
  );

  const renderItem = React.useCallback(
    (organizer, idx) => {
      const handleExpandCollapse = () => {
        setExpandedOrganizerIds(prevExpandedOrganizerIds =>
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
      <MarketplaceSectionTitle>{marketplaceName} Sales</MarketplaceSectionTitle>
      <StatefulList
        className="mt3"
        loading={queryRes.loading}
        items={activeSales}
        renderItem={renderItem}
        onFetchMore={
          queryRes.payload && items.length < queryRes.payload.pagination.total
            ? fetchMore
            : undefined
        }
      />
    </>
  );
};

const EnhancedMarketplaceSalesContainer = React.memo(MarketplaceSalesContainer);

export default EnhancedMarketplaceSalesContainer;
