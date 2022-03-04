import React, {useMemo} from 'react';
import moment from 'moment';

import DateHelpers from 'helpers/DateHelpers';
import ImagesUtils from 'helpers/ImagesUtils';
import SharedCollectionBannerPlaceholder from 'theme/images/SharedCollectionBannerPlaceholder.svg';

const CollectionCard = ({collection}) => {
  const imgUrl = useMemo(
    () =>
      collection?.headerImage
        ? ImagesUtils.getCroppedImageUrl(collection.headerImage)
        : SharedCollectionBannerPlaceholder,
    [collection]
  );

  const imgStyle = useMemo(
    () => ({
      backgroundImage: `url(${imgUrl})`,
    }),
    [imgUrl]
  );

  const collectionLink = `/c/${collection.slug}`;

  const collectionStatus = useMemo(() => {
    if (collection.closed_at) {
      return 'Closed';
    }
    if (collection.timing?.opens && collection.timing?.closes) {
      const current = moment();
      const opens = moment(collection.timing.opens);
      const closes = moment(collection.timing.closes);

      if (current <= opens) {
        return <span className="tint">Opens {opens.format('MM/DD/YY')}</span>;
      }
      if (closes <= current) {
        return <span className="tint">Ended {closes.format('MM/DD/YY')}</span>;
      }
    }

    return <span className="tint">Active</span>;
  }, [collection]);

  return (
    <a
      href={collectionLink}
      target="_blank"
      rel="noopener noreferrer"
      className="shared-collection-card br2 mb3-5"
    >
      <div>
        <div className="flex flex-column">
          <div className="shared-collection-card__image" style={imgStyle} />
          <div className="flex-auto pa3-25 bg-white flex flex-column">
            <div className="flex-auto">
              <div className="relative h-100">
                <div className="absolute absolute--fill merriweather dark-grey text-16 line-24 shared-collection-card__title">
                  {collection.name}
                </div>
              </div>
            </div>
            <div className="dark-grey text-14 avenir-light">
              {collectionStatus}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const EnhancedCollectionCard = React.memo(CollectionCard);

export default EnhancedCollectionCard;
