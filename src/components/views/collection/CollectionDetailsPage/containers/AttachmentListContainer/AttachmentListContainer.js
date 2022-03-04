import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

import {
  DELETE_ATTACHMENT,
  GET_ATTACHMENTS,
} from 'redux/modules/collections/constants';
import {Status} from 'elements';
import {asyncConnect} from 'helpers';
import {
  deleteAttachment,
  getAttachments,
} from 'redux/modules/collections/actions';

import {AttachmentList} from './components';

const AttachmentListContainer = ({version}) => {
  const dispatch = useDispatch();
  const getAttachmentsStatus = useSelector(
    (state) => state.async.statuses[GET_ATTACHMENTS]
  );
  const deleteAttachmentStatus = useSelector(
    (state) => state.async.statuses[DELETE_ATTACHMENT]
  );
  const attachments = useSelector((state) => state.collections.attachments);

  const handleDeleteAttachment = React.useCallback(
    ({attachment, collection}) => {
      dispatch(deleteAttachment({attachment, collection}));
    },
    [dispatch]
  );

  return !attachments && getAttachmentsStatus !== 'success' ? (
    <Status status={getAttachmentsStatus} />
  ) : (
    <AttachmentList
      attachments={attachments}
      version={version}
      deletingStatus={deleteAttachmentStatus}
      onDeleteClick={handleDeleteAttachment}
    />
  );
};

const enhance = asyncConnect((props) => [
  {
    key: GET_ATTACHMENTS,
    promise: getAttachments,
    payload: {
      collection: props.collectionId,
    },
  },
]);

const EnhancedAttachmentListContainer = enhance(AttachmentListContainer);

export default EnhancedAttachmentListContainer;
