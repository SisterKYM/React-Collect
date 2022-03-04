import PropTypes from 'prop-types';
import React from 'react';

import {getFileNameFromUrl} from 'helpers';

import AttachmentListItem from './AttachmentListItem';

const AttachmentList = ({
  attachments,
  onDeleteClick,
  deletingStatus,
  version,
}) => {
  const parsedAttachments = React.useMemo(
    () =>
      attachments.map((attachment) => ({
        ...attachment,
        name: getFileNameFromUrl(attachment.file_name.url),
      })),
    [attachments]
  );

  const renderAttachment = React.useCallback(
    (attachment) => (
      <AttachmentListItem
        key={attachment.id}
        version={version}
        attachment={attachment}
        onDeleteClick={onDeleteClick}
        deletingStatus={deletingStatus}
      />
    ),
    [deletingStatus, onDeleteClick, version]
  );
  if (version === 'chip' && parsedAttachments.length > 0) {
    return (
      <div className="flex flex-wrap list mt3">
        {parsedAttachments.map((attachment) => renderAttachment(attachment))}
      </div>
    );
  }

  return <ul>{parsedAttachments.map((x) => renderAttachment(x))}</ul>;
};

const EnhancedAttachmentList = Object.assign(React.memo(AttachmentList), {
  propTypes: {
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        file_name: PropTypes.shape({
          url: PropTypes.string,
        }),
        tab_id: PropTypes.number,
      })
    ),
    onDeleteClick: PropTypes.func,
    deletingStatus: PropTypes.string,
  },
});

export default EnhancedAttachmentList;
