import React from 'react';
import cx from 'classnames';
import posed, {PoseGroup} from 'react-pose';

import {ProfileImage} from 'elements';
import config from 'config';

import MarketplaceSalesItemCollectionItem from './MarketplaceSalesItemCollectionItem';

const AnimatedContainer = posed.li({
  expanded: {
    backgroundColor: config.colors.lightTint,
    transition: {
      duration: 500,
    },
  },
  collapsed: {
    backgroundColor: '#ffffff',
  },
});
const AnimatedCollectionListContainer = posed.div({
  enter: {
    height: 'auto',
  },
  exit: {
    height: 0,
  },
});

const renderCollection = (collection) => (
  <MarketplaceSalesItemCollectionItem
    key={collection.id}
    collection={collection}
  />
);

const MarketplaceSalesItem = ({
  className,
  expanded,
  organizer,
  onExpandCollapse,
}) => {
  const collectionsCount = Array.isArray(organizer.collections)
    ? organizer.collections.length
    : 0;

  return (
    <AnimatedContainer
      className={className}
      pose={expanded ? 'expanded' : 'collapsed'}
    >
      <div
        className={cx(
          'organizer-content-container flex w-100 pa4 justify-between items-center pointer'
        )}
        onClick={onExpandCollapse}
      >
        <div className="flex">
          <ProfileImage
            className="profile-image mr3"
            imageUrl={organizer.profilePic}
          />
          <div className="flex flex-column justify-around">
            <div className="truncate f5 i merriweather">
              {organizer.display_name ||
                `${organizer.first_name} ${organizer.last_name}`}
            </div>
            <div className="f6 avenir-light gray-400">
              {collectionsCount} Sale{collectionsCount === 1 ? '' : 's'}
            </div>
          </div>
        </div>
        <div className="f6 avenir-medium tint">
          {expanded ? 'Close' : 'View'}
        </div>
      </div>
      <PoseGroup>
        {expanded && (
          <AnimatedCollectionListContainer
            key="collection-list-container"
            className="overflow-hidden"
          >
            <ul>
              {organizer.collections &&
                organizer.collections.map((collection) =>
                  renderCollection(collection)
                )}
            </ul>
          </AnimatedCollectionListContainer>
        )}
      </PoseGroup>
      <style jsx>{`
        .organizer-content-container {
          height: 5.5rem;
        }
        :global(.profile-image) {
          width: 3rem;
        }
      `}</style>
    </AnimatedContainer>
  );
};

const EnhancedMarketplaceSalesItem = React.memo(MarketplaceSalesItem);

export default EnhancedMarketplaceSalesItem;
