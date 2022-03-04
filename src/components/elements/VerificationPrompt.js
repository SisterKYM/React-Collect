import React from 'react';
import {MdClose} from 'react-icons/md';

import {CommonButton, Modal, Status} from 'elements';

const VerificationPrompt = ({
  id,
  className,
  contentContainerClassName,
  smallOnMobile,
  flexibleHeight,
  zIndex,
  footer,
  onDismiss,
  children,
  title,
  titleClassName,
  description,
  okButtonLabel,
  onOkButtonClick,
  okButtonDisabled,
  cancelButtonLabel,
  onCancelButtonClick,
  cancelButtonDisabled,
  status,
  cancelFirst,
}) => (
  <Modal
    id={id}
    className={className}
    contentContainerClassName={contentContainerClassName}
    smallOnMobile={smallOnMobile}
    size="SMALL"
    flexibleHeight={flexibleHeight}
    zIndex={zIndex}
    footer={footer}
    onDismiss={onDismiss}
  >
    <div className="modal-header">
      <div className="close-button">
        <div className="fixed pointer dark-grey" onClick={onDismiss}>
          <MdClose size={24} />
        </div>
      </div>
      {title ? <h1 className={titleClassName}>{title}</h1> : ''}
    </div>
    <div className="modal-body">
      <p
        className="dark-grey description"
        dangerouslySetInnerHTML={{__html: description}}
      />
      {children}
      <div className="flex mt3 items-center">
        {cancelFirst && (
          <CommonButton
            className="pt-14 gray-600 bg-gray-250 mr3"
            disabled={cancelButtonDisabled}
            onClick={onCancelButtonClick}
          >
            {cancelButtonLabel}
          </CommonButton>
        )}
        <CommonButton
          className="pt-14 bg-brand white"
          disabled={okButtonDisabled}
          onClick={onOkButtonClick}
        >
          {okButtonLabel}
        </CommonButton>
        {!cancelFirst && (
          <CommonButton
            className="pt-14 gray-600 bg-gray-250 ml3"
            disabled={cancelButtonDisabled}
            onClick={onCancelButtonClick}
          >
            {cancelButtonLabel}
          </CommonButton>
        )}
        {status === 'pending' ? <Status status="pending" /> : ''}
      </div>
    </div>
    <style jsx>{`
      .modal-header {
        position: relative;
        padding: 24px 24px 18px;
        border-bottom: 1px solid #dedede;
      }
      .close-button {
        position: absolute;
        top: 24px;
        right: 48px;
      }
      h1 {
        font-size: 16px;
        line-height: 24px;
        color: #373737;
        font-family: 'AvenirLTStd-Heavy', sans-serif;
      }
      .modal-body {
        padding: 21px 24px 30px;
      }
      .description {
        margin-bottom: 24px;
        font-size: 16px;
        line-height: 24px;
      }
    `}</style>
  </Modal>
);

const EnhancedVerificationPrompt = React.memo(VerificationPrompt);

export default EnhancedVerificationPrompt;
