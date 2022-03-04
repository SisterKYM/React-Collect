import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import _ from 'lodash';

import {GET_COLLECTION} from 'redux/modules/collections/constants';
import {
  GET_INVITES,
  SEND_ALL_REMINDERS,
  SEND_TEST_REMINDER,
} from 'redux/modules/members/constants';
import {Reminder} from 'views/collection/share/components';
import {asyncConnect} from 'helpers';
import {
  getCollection,
  updateCollection,
} from 'redux/modules/collections/actions';
import {
  getInvites,
  sendAllReminders,
  sendTestReminder,
} from 'redux/modules/members/actions';

const InviteRemindersPage = ({location, match, history}) => {
  const dispatch = useDispatch();

  const collection = useSelector((state) => state.collections.collection);
  const invites = useSelector(
    (state) => (state.members && state.members.invites) || []
  );
  const sendStatus = useSelector(
    (state) => state.async.statuses[SEND_ALL_REMINDERS]
  );
  const testStatus = useSelector(
    (state) => state.async.statuses[SEND_TEST_REMINDER]
  );

  const onDismiss = React.useCallback(() => {
    history.push(location.pathname.split('/reminders')[0]);
  }, [history, location.pathname]);

  const scheduleAuto = React.useCallback(
    (frequency, includePastPayers) => {
      dispatch(
        updateCollection({
          id: _.get(collection, 'id'),
          reminder_frequency: frequency,
          options: {
            ..._.get(collection, 'options', {}),
            autoRemindersIncludePastPayers: includePastPayers,
          },
        })
      );
    },
    [collection, dispatch]
  );

  const sendAll = React.useCallback(() => {
    dispatch(
      sendAllReminders({collection: _.get(match, 'params.collection', '')})
    );
  }, [dispatch, match]);

  const sendTest = React.useCallback(() => {
    dispatch(
      sendTestReminder({collection: _.get(match, 'params.collection', '')})
    );
  }, [dispatch, match]);

  return (
    <Reminder
      collection={collection}
      invites={invites}
      onDismiss={onDismiss}
      scheduleAuto={scheduleAuto}
      sendAll={sendAll}
      sendStatus={sendStatus}
      sendTest={sendTest}
      testStatus={testStatus}
    />
  );
};

const enhance = asyncConnect((props) => {
  const cid = _.get(props, 'match.params.collection');

  return [
    {
      key: GET_COLLECTION,
      payload: {collection: cid},
      promise: getCollection,
    },
    {
      key: GET_INVITES,
      payload: {collection: cid},
      promise: getInvites,
    },
  ];
});

const EnhancedInviteRemindersPage = enhance(InviteRemindersPage);

export default EnhancedInviteRemindersPage;
