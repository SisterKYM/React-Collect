import React from 'react';
import _ from 'lodash';

import {GET_MEMBERS} from 'redux/modules/members/constants';
import {SendMessageToMembersContainer} from 'containers';
import {asyncConnect} from 'helpers';
import {getMembers} from 'redux/modules/members/actions';

const MessagePage = ({history, location, match}) => {
  const cid = Number(_.get(match, 'params.collection', 0));

  const onDismiss = React.useCallback(() => {
    const pathname = location.pathname;
    history.push(pathname.split('/message')[0]);
  }, [history, location.pathname]);

  return (
    <SendMessageToMembersContainer
      collection={cid}
      formName="views/collection/share/invitations/message/Page_form"
      onDismiss={onDismiss}
    />
  );
};

const enhance = asyncConnect((props) => [
  {
    key: GET_MEMBERS,
    payload: {collection: _.get(props.match, 'params.collection', '')},
    promise: getMembers,
  },
]);

const EnhancedMessagePage = enhance(MessagePage);

export default EnhancedMessagePage;
