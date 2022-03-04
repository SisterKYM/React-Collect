import React from 'react';
import {MdClose} from 'react-icons/md';
import cx from 'classnames';

import {CommonButton, Modal} from 'elements';

const InputPrompt = ({
  id,
  className,
  contentContainerClassName,
  smallOnMobile,
  flexibleHeight,
  size = 'SMALL',
  zIndex,
  footer,
  onDismiss,
  children,
  title,
  titleClassName,
  description,
  showOkButton = true,
  okButtonLabel,
  onOkButtonClick,
  okButtonClassName = 'bg-brand white',
  okButtonDisabled,
  showCancelButton = true,
  cancelButtonLabel,
  onCancelButtonClick,
  cancelButtonClassName = 'gray-600 bg-gray-250',
  cancelButtonDisabled,
}) => (
  <Modal
    id={id}
    className={cx(className, 'input-prompt-box dark-grey')}
    contentContainerClassName={contentContainerClassName}
    smallOnMobile={smallOnMobile}
    size={size}
    flexibleHeight={flexibleHeight}
    zIndex={zIndex}
    footer={footer}
    onDismiss={onDismiss}
  >
    <div className="modal-header">
      <div className="close-button">
        <div
          className="fixed pointer"
          onClick={() => {
            onDismiss();
          }}
        >
          <MdClose size={24} />
        </div>
      </div>
      {title ? <h1 className={titleClassName}>{title}</h1> : ''}
    </div>
    <div className="modal-body">
      {description ? (
        <p className="gray-600 avenir-roman description text-14">
          {description}
        </p>
      ) : (
        ''
      )}

      {children}

      {(showOkButton || showCancelButton) && (
        <div className="flex mt3 items-center">
          {showOkButton && (
            <CommonButton
              className={cx('pt-14 mr3', okButtonClassName)}
              disabled={okButtonDisabled}
              onClick={onOkButtonClick}
              type="button"
            >
              {okButtonLabel}
            </CommonButton>
          )}{' '}
          {showCancelButton && (
            <CommonButton
              className={cx('pt-14', cancelButtonClassName)}
              disabled={cancelButtonDisabled}
              onClick={onCancelButtonClick}
              type="button"
            >
              {cancelButtonLabel}
            </CommonButton>
          )}
        </div>
      )}
    </div>
    <style jsx>{`
      .modal-header {
        position: relative;
        padding: 24px 32px 0;
      }
      .close-button {
        position: absolute;
        top: 24px;
        right: 48px;
      }
      h1 {
        font-size: 18px;
        line-height: 27px;
        font-family: 'AvenirLTStd-Roman', sans-serif;
      }
      .modal-body {
        padding: 10px 32px 27px;
      }
      .description {
        margin-bottom: 20px;
      }
    `}</style>
  </Modal>
);

const EnhancedInputPrompt = React.memo(InputPrompt);

export default EnhancedInputPrompt;
