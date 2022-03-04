import React from 'react';
import {IoMdClose} from 'react-icons/io';
import cx from 'classnames';

import {Button} from 'elements';

const DeleteItemOptionPopUp = ({
  className,
  title,
  description,
  onDelete,
  onCancel,
}) => (
  <div
    className={cx('delete-item-option-container bg-white shadow-4', className)}
  >
    <div className="absolute ic-close">
      <IoMdClose size={20} onClick={onCancel} />
    </div>
    <h4 className="header-title pv0 avenir-heavy gray-600">{title}</h4>
    <div className="popup-content gray-600">
      <p className="popup-content-description lh-copy">{description}</p>
      <Button
        small
        backgroundColorSet
        className="bg-brand"
        type="button"
        onClick={onDelete}
      >
        Delete
      </Button>
      <Button
        small
        backgroundColorSet
        colorSet
        className="ml3 gray-600 bg-gray-200"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
    <style jsx>{`
      .delete-item-option-container {
        width: 24rem;
      }
      .header-title {
        width: 100%;
        border-bottom: 2px solid #eeeeee;
        padding: 1.5rem 1.5rem 1.25rem;
      }
      .ic-close {
        top: 1.5rem;
        right: 1.5rem;
      }
      .popup-content {
        padding: 1.5rem;
        font-size: 1rem;
      }
      .popup-content-description {
        padding-bottom: 1.5rem;
      }
    `}</style>
  </div>
);

const EnhancedDeleteItemOptionPopUp = React.memo(DeleteItemOptionPopUp);

export default EnhancedDeleteItemOptionPopUp;
