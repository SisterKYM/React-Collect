import {generatePath, Link} from 'react-router-dom';
import cx from 'classnames';
import React from 'react';

import ImagesUtils from 'helpers/ImagesUtils';

const OrganizerInfo = ({className, collectionSlug, organizer}) => (
  <div className={cx('flex flex-column items-center pv4 ph3', className)}>
    {organizer.profile_pic && (
      <img
        className="organizer-avatar mb3 br-100"
        alt="Organizer avatar"
        src={ImagesUtils.getCroppedImageUrl(organizer.profile_pic, {
          width: 180,
          height: 180,
        })}
      />
    )}
    <p className="mb2 mb3-ns f5 merriweather i tc gray-600">
      {organizer.displayName}
    </p>
    <Link
      className="f6 tc avenir-roman tint dim ttu"
      to={generatePath('/c/:collection/help', {
        collection: collectionSlug,
      })}
    >
      Contact
    </Link>
    <style jsx>{`
      :global(.organizer-avatar) {
        width: 3.75rem;
        height: 3.75rem;
      }
    `}</style>
  </div>
);

const EnhancedOrganizerInfo = React.memo(OrganizerInfo);

export default EnhancedOrganizerInfo;
