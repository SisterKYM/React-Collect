import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get} from 'lodash';
import React from 'react';

import config from 'config';
import {Button, AddManagerForm} from 'elements';
import {
  GET_MANAGERS,
  INVITE_MANAGER,
  REMIND_MANAGER,
} from 'redux/modules/managers/constants';
import {UserBasePage} from 'views/user/components';
import {asyncConnect} from 'helpers';
import {backgroundPath} from 'views/i/helpers';
import {
  deleteManager,
  getManagers,
  inviteManager,
  remindManager,
  updateManager,
} from 'redux/modules/managers/actions';

import {ManagerList} from './components';

class UserManagersPage extends React.PureComponent {
  state = {
    addManagerFormVisible: false,
    allPermissionsExpanded: false,
  };

  toggleAddManagerForm = () => {
    this.setState((prevState) => ({
      addManagerFormVisible: !prevState.addManagerFormVisible,
    }));
  };

  toggleAllPermissionsExpanded = () => {
    this.setState((prevState) => ({
      allPermissionsExpanded: !prevState.allPermissionsExpanded,
    }));
  };

  handleSubmitAddManagerForm = (values) => {
    this.props.onInviteManager(values);
    this.setState({addManagerFormVisible: false});
  };

  handleUpgradeToTeam = () => {
    const upgradeToTeamPath = `${backgroundPath(
      this.props.location
    )}/i/plans/team-upgrade`;

    this.props.history.push(upgradeToTeamPath);
  };

  render() {
    const {session, managers} = this.props;

    return (
      <UserBasePage
        className="bg-white gray-600"
        currentUrl={this.props.location.pathname}
        heading="Managers"
      >
        <h2 className="mt3 f3">
          Invite others to help manage {config.strings.collection}s
        </h2>
        <p className="mt2 avenir-light f5 lh-copy">
          When you add a manager, you give them access to edit, view payments,
          and receive payment email notifications on specific{' '}
          {config.strings.collection}s. If given permission, they can also
          create new {config.strings.collection}s. Managers will not be able to
          make withdrawals or view bank information.
        </p>
        <div className="mt4">
          {get(session, 'isTeamUser', false) ? (
            <>
              <div>
                <ManagerList
                  getManagersStatus={this.props.getManagersStatus}
                  remindManagerPending={this.props.remindManagerPending}
                  managers={managers}
                  isAllPermissionsExpanded={this.state.allPermissionsExpanded}
                  updateManager={this.props.onUpdateManager}
                  remindManager={this.props.onRemindManager}
                  deleteManager={this.props.onDeleteManager}
                />
              </div>
              {this.state.addManagerFormVisible ? (
                <div className="pa3 mt3 bg-gray-200">
                  <AddManagerForm
                    form="elements/AddManagerForm/Form"
                    status={this.props.addManagerStatus}
                    errMsg={this.props.addManagerError}
                    onRemoveForm={this.toggleAddManagerForm}
                    onSubmit={this.handleSubmitAddManagerForm}
                  />
                </div>
              ) : (
                <>
                  <Button
                    small
                    colorSet
                    backgroundColorSet
                    className={`${
                      managers.length > 0 ? 'mt3' : ''
                    } gray-600 bg-gray-250 mb4`}
                    onClick={this.toggleAddManagerForm}
                  >
                    Add Manager
                  </Button>
                  <div className="bb b--gray-300" />
                </>
              )}
            </>
          ) : (
            <>
              <Button
                small
                backgroundColorSet
                className="bg-gray-250 gray-600 mb4"
                onClick={this.handleUpgradeToTeam}
              >
                Upgrade to Team
              </Button>
              <div className="bb b--gray-300" />
            </>
          )}
        </div>
        <style jsx>{`
          .expand-icon {
            height: 24px;
          }
          .upgrade-image {
            max-width: 700px;
          }
        `}</style>
      </UserBasePage>
    );
  }
}

const enhance = compose(
  asyncConnect([
    {
      key: GET_MANAGERS,
      promise: getManagers,
    },
  ]),
  connect(
    ({async, browser, session, managers}) => ({
      session,
      browser,
      managers: get(managers, 'managers', []),
      addManagerStatus: async.statuses[INVITE_MANAGER],
      getManagersStatus: async.statuses[GET_MANAGERS],
      remindManagerPending: async.statuses[REMIND_MANAGER] === 'pending',
      addManagerError: get(async.errors, [
        INVITE_MANAGER,
        'response',
        'data',
        'errors',
        'invited_email',
      ])
        ? 'Please use a valid email that has not already been invited'
        : null,
    }),
    (dispatch) => ({
      onInviteManager: (values) =>
        dispatch(
          inviteManager({
            ...values,
            accessScope: {
              collections: {
                all: {
                  receive_messages: true,
                },
                type: 'all',
                create: true,
                specific: {},
              },
            },
          })
        ),
      onUpdateManager: (payload) => dispatch(updateManager(payload)),
      onRemindManager: (payload) => dispatch(remindManager(payload)),
      onDeleteManager: (payload) => dispatch(deleteManager(payload)),
    })
  )
);

const EnhancedUserManagersPage = enhance(UserManagersPage);

export default EnhancedUserManagersPage;
