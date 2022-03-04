import React from 'react';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {
  GET_MANAGERS,
  INVITE_MANAGER,
  REMIND_MANAGER,
} from 'redux/modules/managers/constants';
import {asyncConnect} from 'helpers';
import {
  updateManager,
  getManagers,
  inviteManager,
  remindManager,
} from 'redux/modules/managers/actions';
import CollectionSettingsField from '../components/CollectionSettingsField';
import CollectionSettingsManagers from './Managers';
import CollectionSettingsContact from './Contact';

const CollectionSettingsManagersAndContact = ({
  collection,
  managers,
  getManagersStatus,
  remindManagerPending,
  onRemindManager,
  onUpdateManager,
}) => (
  <>
    <CollectionSettingsField
      title="MANAGERS"
      content={
        <CollectionSettingsManagers
          collection={collection}
          users={managers}
          getManagersStatus={getManagersStatus}
          remindManagerPending={remindManagerPending}
          onRemindManager={onRemindManager}
          onUpdateManager={onUpdateManager}
        />
      }
    />
    <CollectionSettingsField
      title="MAIN CONTACT"
      content={
        <CollectionSettingsContact
          managers={managers}
          collection={collection}
        />
      }
    />
  </>
);

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
      onRemindManager: (payload) => dispatch(remindManager(payload)),
      onUpdateManager: (payload) => dispatch(updateManager(payload)),
    })
  )
);
export default enhance(CollectionSettingsManagersAndContact);
