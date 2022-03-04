import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import {InvitationCTA} from 'views/collection/share/components';
import {CommonModal, CommonButton, Status, StatusContainer} from 'elements';
import {collectionsPathHelper} from 'helpers';

import InstantReminder from './InstantReminder';
import ScheduleReminders from './ScheduleReminders';

const Reminder = ({
  collection,
  invites,
  onDismiss,
  scheduleAuto,
  sendAll,
  sendStatus,
  sendTest,
  testStatus,
}) => {
  const unpaid = React.useMemo(() => _.reject(invites, 'paid'), [invites]);

  return (
    <CommonModal
      onDismiss={onDismiss}
      title="Reminders"
      subTitle={`Send an instant or scheduled reminder to anyone who was invited but has not paid <span class="tint avenir-light">(${unpaid.length})</span>`}
      subTitleClassName="avenir-light"
    >
      {invites.length !== 0 ? (
        <>
          <div className="bb b--gray-300">
            <div className="pv3 ph4">
              <StatusContainer
                status={sendStatus}
                messages={{
                  pending: 'Sending reminders...',
                  success: 'Sent!',
                }}
              >
                <InstantReminder unpaid={unpaid} sendAll={sendAll} />
              </StatusContainer>
            </div>
          </div>
          <div className="bb b--gray-300">
            <div className="pv3 ph4">
              <ScheduleReminders
                initialFrequency={_.get(collection, 'reminder_frequency', 0)}
                initialIncludePastPayers={_.get(
                  collection,
                  'options.autoRemindersIncludePastPayers',
                  false
                )}
                onSchedule={scheduleAuto}
              />
            </div>
          </div>

          <div className="pa4 flex items-center">
            <CommonButton
              className="bg-gray-250 gray-600 pt-14 mr3"
              onClick={sendTest}
            >
              Send me a test
            </CommonButton>
            {Boolean(testStatus) && (
              <Status
                status={testStatus}
                messages={{pending: 'Sending a test to your inbox...'}}
              />
            )}
          </div>
        </>
      ) : (
        <div className="pa4">
          <InvitationCTA
            path={collectionsPathHelper(collection, 'share/invitations')}
          />
        </div>
      )}
    </CommonModal>
  );
};

const EnhancedReminder = Object.assign(React.memo(Reminder), {
  propTypes: {
    collection: PropTypes.object,
    invites: PropTypes.array,
    onDismiss: PropTypes.func,
    scheduleAuto: PropTypes.func,
    sendAll: PropTypes.func,
    sendStatus: PropTypes.string,
    sendTest: PropTypes.func,
    testStatus: PropTypes.string,
  },
});

export default EnhancedReminder;
