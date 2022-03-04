import PropTypes from 'prop-types';
import React from 'react';

import Follower from './Follower';

const FollowersList = ({
  className,
  status,
  followers,
  onFollowUpSend,
  onFollowUpDelete,
}) => (
  <div className={className}>
    {followers.map((follower, idx) => (
      <Follower
        key={follower.id}
        className={idx === followers.length - 1 ? '' : 'bb b--gray-300'}
        follower={follower}
        disabled={status === 'pending'}
        onFollowUpSend={onFollowUpSend}
        onFollowUpDelete={onFollowUpDelete}
      />
    ))}
  </div>
);

const EnhancedFollowersList = Object.assign(React.memo(FollowersList), {
  propTypes: {
    followers: PropTypes.arrayOf(PropTypes.object),
    onFollowUpDelete: PropTypes.func,
    onFollowUpSend: PropTypes.func,
    status: PropTypes.string,
  },
});

export default EnhancedFollowersList;
