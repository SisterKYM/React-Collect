import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import {SEND_MESSAGE} from 'redux/modules/members/constants';
import {errorAlert} from 'redux/modules/growl/actions';
import {sendMessage, sendTestMessage} from 'redux/modules/members/actions';

import {SendMessageToMemebers} from './components';

const SendMessageToMembersContainer = ({collection, formName, onDismiss}) => {
  const dispatch = useDispatch();

  const formValues = useSelector(state =>
    _.get(state.form[formName], 'values', {})
  );
  const sendStatus = useSelector(state => state.async.statuses[SEND_MESSAGE]);
  const members = useSelector(state => state.members.members || []);

  const onSubmit = React.useCallback(
    values => {
      const {subject, message, ...sendTo} = values;

      if (!subject) {
        dispatch(
          errorAlert({
            body: 'You must include a subject line.',
            title: 'Error',
          })
        );

        return;
      }

      if (!message) {
        dispatch(
          errorAlert({
            body: 'You must include a message.',
            title: 'Error',
          })
        );

        return;
      }

      dispatch(
        sendMessage({
          subject,
          message,
          tab_member_ids: _.toPairs(sendTo)
            .filter(i => i[0].includes('sendTo_') && Boolean(i[1]))
            .map(i => i[0].split('sendTo_')[1]),
          collection,
        })
      );
    },
    [collection, dispatch]
  );

  const onTest = React.useCallback(() => {
    dispatch(
      sendTestMessage({
        collection,
        message: _.get(formValues, 'message', ''),
        subject: _.get(formValues, 'subject', ''),
      })
    );
  }, [collection, dispatch, formValues]);

  return (
    <SendMessageToMemebers
      formName={formName}
      members={members}
      onDismiss={onDismiss}
      onSubmit={onSubmit}
      onTest={onTest}
      sendStatus={sendStatus}
    />
  );
};

const EnhancedSendMessageToMembersContainer = Object.assign(
  React.memo(SendMessageToMembersContainer),
  {
    propTypes: {
      collection: PropTypes.number,
      formName: PropTypes.string,
      onDismiss: PropTypes.func,
    },
  }
);

export default EnhancedSendMessageToMembersContainer;
