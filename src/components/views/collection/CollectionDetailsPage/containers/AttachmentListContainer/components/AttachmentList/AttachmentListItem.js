import {FaTrash} from 'react-icons/fa';
import PropTypes from 'prop-types';
import React from 'react';

import AttachmentSmIcon from 'theme/images/Attachment.Sm.svg';
import DeleteSm from 'theme/images/DeleteSm.svg';

const FEATURE_ICON_SIZE = 30;

const AttachmentListItem = ({
  attachment: {
    id,
    tab_id,
    name,
    file_name: {url},
  },
  onDeleteClick,
  deletingStatus,
  version,
}) => {
  const [deleting, toggleDeleting] = React.useState(false);

  const handleDelete = React.useCallback(() => {
    toggleDeleting(true);
    onDeleteClick({
      attachment: id,
      collection: tab_id,
    });
  }, [id, tab_id, toggleDeleting, onDeleteClick]);
  if (version === 'chip') {
    return (
      <li className="relative mv1 attachment-list-item pl3 pv2 ba b--gray-300 mr2 br2 overflow-hidden">
        {deleting && deletingStatus === 'pending' ? (
          <span className="dark-grey f7 avenir-light">Deleting...</span>
        ) : (
          <a className="dark-grey f7 avenir-light" href={url}>
            {name}
          </a>
        )}
        <i className="trash-icon-wrapper bg-white absolute top-0 right-0 bottom-0 flex justify-center items-center pointer">
          <img alt="" src={DeleteSm} width={10} onClick={handleDelete} />
        </i>
        <style jsx>{`
          .attachment-list-item {
            min-width: 100px;
          }
          .trash-icon-wrapper {
            width: 30px;
          }
        `}</style>
      </li>
    );
  }

  return (
    <li className="relative pr5 pv3 mt2 ba b--gray-300">
      <div className="attachment-icon-wrapper absolute top-0 left-0 bottom-0 flex justify-center items-center br b--gray-300">
        <img alt="" src={AttachmentSmIcon} width={25} />
      </div>
      {deleting && deletingStatus === 'pending' ? (
        'Deleting...'
      ) : (
        <a href={url}>{name}</a>
      )}
      <i className="trash-icon-wrapper absolute top-0 right-0 bottom-0 flex justify-center items-center pointer">
        <FaTrash
          className="gray-200"
          size={FEATURE_ICON_SIZE}
          onClick={handleDelete}
        />
      </i>
      <style jsx>{`
        li {
          padding-left: 83px;
        }
        .attachment-icon-wrapper {
          width: 63px;
        }
        .trash-icon-wrapper {
          width: 60px;
        }
      `}</style>
    </li>
  );
};

const EnhancedAttachmentListItem = Object.assign(
  React.memo(AttachmentListItem),
  {
    propTypes: {
      attachment: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        url: PropTypes.string,
        tab_id: PropTypes.number,
      }),
      onDeleteClick: PropTypes.func,
      deletingStatus: PropTypes.string,
    },
  }
);

export default EnhancedAttachmentListItem;
