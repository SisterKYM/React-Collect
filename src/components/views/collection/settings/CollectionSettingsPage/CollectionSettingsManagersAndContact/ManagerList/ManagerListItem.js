import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';

import DefaultAvatarIcon from 'theme/images/DefaultAvatar.svg';

import SentStatus from './SentStatus';

const MANAGER_INFO_CONTAINER_HEIGHT = 35;

class ManagerListItem extends React.PureComponent {
  static propTypes = {
    accepted_at: PropTypes.string,
    id: PropTypes.number,
    invited_email: PropTypes.string,
    name: PropTypes.string,
    notSmall: PropTypes.bool,
  };

  handleRemindManager = () => {
    if (!this.props.remindPending) {
      this.props.remindManager({manager: this.props.id});
    }
  };

  renderSentStatus = () => (
    <SentStatus
      onRemindClick={this.handleRemindManager}
      remindPending={this.props.remindPending}
      status={this.props.accepted_at ? 'Active' : 'Pending'}
    />
  );

  render() {
    const {granted_user} = this.props;

    return (
      <div className="pv3 text-14 mt3 pa3 main-border">
        <div className="manager-info-container flex flex-column flex-row-ns mr3 itmes-start items-center-ns">
          <div className="flex w-40">
            <div
              className="manager-avatar flex-shrink-0 br-100 cover"
              style={{
                backgroundImage: `url("${
                  (granted_user &&
                    granted_user.profile_pic &&
                    granted_user.profile_pic.url) ||
                  DefaultAvatarIcon
                }")`,
              }}
            />
            <div className="ml3 lh-copy">
              <p className="text-16">{this.props.name}</p>
              <p>
                {(granted_user && granted_user.email) ||
                  this.props.invited_email}
              </p>
            </div>
          </div>
          <div className="dn db-ns mh3 w-30 tc">{this.renderSentStatus()}</div>
          <Link
            className="pointer w-30 tint tr"
            target="_blank"
            style={{marginLeft: this.props.notSmall ? 0 : 49}}
            to="/collections/managers"
          >
            Permissions
          </Link>
        </div>
        <style jsx>{`
          .manager-info-container {
            // height: ${MANAGER_INFO_CONTAINER_HEIGHT}px;
          }
          .manager-avatar {
            height: ${MANAGER_INFO_CONTAINER_HEIGHT}px;
            width: ${MANAGER_INFO_CONTAINER_HEIGHT}px;
          }
          .image-offset {
            margin-left: ${MANAGER_INFO_CONTAINER_HEIGHT + 18}px;
          }
        `}</style>
      </div>
    );
  }
}

export default ManagerListItem;
