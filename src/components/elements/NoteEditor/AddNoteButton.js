import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import {Tooltip} from 'elements';
import NotesIcon from 'theme/images/Notes.svg';

const AddNoteButton = ({className, tooltip, onClick}) => (
  <Tooltip
    className="flex items-center"
    style={{
      bottom: 32,
      left: 0,
      marginLeft: -42,
      width: 100,
    }}
    text={tooltip}
  >
    <img
      className={cx('edit-icon br2 bg-gray-250 medium-grey pointer', className)}
      alt="notes"
      src={NotesIcon}
      onClick={onClick}
    />
    <style jsx>{`
      .edit-icon {
        width: 30px;
        padding: 6px;
      }
    `}</style>
  </Tooltip>
);

const EnhancedAddNoteButton = Object.assign(React.memo(AddNoteButton), {
  propTypes: {
    onClick: PropTypes.func,
    tooltip: PropTypes.string,
  },
});

export default EnhancedAddNoteButton;
