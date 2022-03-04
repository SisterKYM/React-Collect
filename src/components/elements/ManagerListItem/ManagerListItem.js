import PropTypes from 'prop-types';
import React from 'react';

import config from 'config';
import {Checkbox, Button} from 'elements';
import DefaultAvatarIcon from 'theme/images/DefaultAvatar.svg';

import ManagerPermissions from './ManagerPermissions';
import SentStatus from './SentStatus';

const MANAGER_INFO_CONTAINER_HEIGHT = 50;

class ManagerListItem extends React.PureComponent {
  static propTypes = {
    isInEditMode: PropTypes.bool,
    isAllPermissionsExpanded: PropTypes.bool,
    accepted_at: PropTypes.string,
    id: PropTypes.number,
    invited_email: PropTypes.string,
    name: PropTypes.string,
    collectionId: PropTypes.number,
    deleteManager: PropTypes.func,
    updateManager: PropTypes.func,
  };

  handleChangeCreateCollectionsPermission = ({target: {checked}}) => {
    this.props.updateManager({
      manager: this.props.id,
      id: this.props.id,
      name: this.props.name,
      invited_email: this.props.invited_email,
      accepted_at: this.props.accepted_at,
      invited_at: this.props.invited_at,
      granted_user: this.props.granted_user,
      access_scope: {
        ...this.props.access_scope,
        collections: {
          ...this.props.access_scope.collections,
          create: checked,
        },
      },
    });
  };

  handleDeleteManager = () => {
    this.props.deleteManager({
      manager: this.props.id,
      collection_id: this.props.collectionId,
    });
  };

  handleRemindManager = () => {
    if (!this.props.remindPending) {
      this.props.remindManager({
        manager: this.props.id,
        email: this.props.invited_email,
      });
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
      <div className="mb3 pa3 f6 ba b--gray-300 bg-white br2">
        <div className="manager-info-container flex items-center">
          <div
            className="manager-avatar br-100 cover"
            style={{
              backgroundImage: `url("${
                (granted_user &&
                  granted_user.profile_pic &&
                  granted_user.profile_pic.url) ||
                DefaultAvatarIcon
              }")`,
            }}
          />
          <div className="flex-auto ml3 lh-copy gray-600">
            <p className="avenir-roman text-16">{this.props.name}</p>
            <p>
              {(granted_user && granted_user.email) || this.props.invited_email}
            </p>
          </div>
          <div className="dn db-ns mh3">{this.renderSentStatus()}</div>
        </div>
        <div className="db dn-ns image-offset mt2">
          {this.renderSentStatus()}
        </div>
        {this.props.isInEditMode && (
          <div className="mt3">
            <div className="dark-grey text-12">Permissions</div>
            <ManagerPermissions
              isForceExpanded={this.props.isAllPermissionsExpanded}
              manager={this.props.manager}
              updateManager={this.props.updateManager}
            />
            <div
              className="bt b--gray-300"
              style={{marginLeft: -16, marginRight: -16}}
            />
            <div className="flex-ns justify-between pt3">
              <Checkbox
                checkedOnValue
                className="mv2 items-stretch"
                input={{value: this.props.access_scope.collections.create}}
                small
                label={`Allow manager to create new ${config.strings.collection}s within account`}
                onChange={this.handleChangeCreateCollectionsPermission}
              />
              <Button
                small
                colorSet
                backgroundColorSet
                className="gray-600 bg-gray-300 text-12"
                onClick={this.handleDeleteManager}
                style={{height: 36, backgroundColor: '#F0F0F0'}}
              >
                Delete Manager
              </Button>
            </div>
          </div>
        )}
        <style jsx>{`
          .manager-info-container {
            height: ${MANAGER_INFO_CONTAINER_HEIGHT}px;
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
