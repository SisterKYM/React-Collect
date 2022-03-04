import {Link} from 'react-router-dom';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import config from 'config';

import FollowUpInviteIcon from 'theme/images/FollowUpInvite.svg';

const InvitationCTA = ({className, path}) => (
  <div className={cx('tc gray-600', className)}>
    <h2 className="pb4">
      Send an invitation from {config.strings.name} to use our Follow Up
      Features
    </h2>
    <Link to={path}>
      <img height={150} alt="Follow up invite" src={FollowUpInviteIcon} />
    </Link>
  </div>
);

const EnhancedInvitationCTA = Object.assign(React.memo(InvitationCTA), {
  propTypes: {
    path: PropTypes.string.isRequired,
  },
});

export default EnhancedInvitationCTA;
