import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import {ReactComponent as DefaultAvatarIcon} from 'theme/images/DefaultAvatar.svg';
import ImagesUtils from 'helpers/ImagesUtils';
import config from 'config';

const NewSalesItem = ({className, sale}) => (
  <Link
    className={cx(
      'flex flex-column w-100 h-100 pa3 gray-600 bg-white',
      className
    )}
    target="_blank"
    to={`/c/${sale.slug}`}
  >
    <div className="flex-auto pa1 ws-normal bg-white">
      <h5 className="truncate f5 avenir-roman">
        {sale.name} {sale.name} {sale.name}
      </h5>
    </div>
    <div className="new-sales-item-details-wrapper cf w-100 pa1">
      {sale.organizer.profilePic ? (
        <img
          className="fl br-100"
          alt="Organizer profile"
          src={ImagesUtils.getCroppedImageUrl(sale.organizer.profilePic)}
        />
      ) : (
        <DefaultAvatarIcon className="default-avatar-icon fl w-20 w-40-ns" />
      )}
      <div className="fl w-80 w-60-ns ml3 lh-copy">
        <div className="truncate f-small i merriweather gray-400">
          {sale.organizer.display_name || sale.organizer.name}
        </div>
        <div className="truncate f-small avenir-light gray-400">
          {sale.itemCount} item{sale.itemCount === 1 ? '' : 's'}
        </div>
      </div>
    </div>
    <style jsx>{`
      img {
        width: 2.5rem;
        height: 2.5rem;
      }
      :global(.default-avatar-icon) {
        width: 2.5rem;
        height: 2.5rem;
      }
      .new-sales-item-details-wrapper :global(#default-avatar-icon) {
        fill: ${config.siteName === 'PIXIE_LANE'
          ? config.colors.tint
          : config.colors.lightTint} !important;
        stroke: ${config.siteName === 'PIXIE_LANE'
          ? config.colors.tint
          : config.colors.lightTint} !important;
      }
    `}</style>
  </Link>
);

const EnhancedNewSalesItem = React.memo(NewSalesItem);

export default EnhancedNewSalesItem;
