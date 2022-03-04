import {ThreeBounce} from 'better-react-spinkit';
import {Waypoint} from 'react-waypoint';
import React from 'react';

import StatefulView from 'elements/StatefulView';
import config from 'config';

const StatefulList = ({
  className,
  loading,
  items,
  renderEmptyStateView,
  renderItem,
  onFetchMore,
}) => {
  const handleEnterEnd = React.useCallback(() => {
    if (!loading) {
      onFetchMore();
    }
  }, [loading, onFetchMore]);

  return (
    <StatefulView
      className={className}
      loading={loading}
      resultCount={items.length}
      renderEmptyStateView={renderEmptyStateView}
    >
      <ul>{items.map((x, idx) => renderItem(x, idx))}</ul>
      {onFetchMore && (
        <Waypoint onEnter={handleEnterEnd}>
          <div className="flex w-100 pv4 justify-center">
            <ThreeBounce gutter={12} color={config.colors.tint} />
          </div>
        </Waypoint>
      )}
    </StatefulView>
  );
};

const EnhancedStatefulList = React.memo(StatefulList);

export default EnhancedStatefulList;
