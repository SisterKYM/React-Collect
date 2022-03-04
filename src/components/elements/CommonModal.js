import React from 'react';

import {Modal, ModalCloseButton} from 'elements';

const CommonModal = ({
  id,
  className,
  contentContainerClassName,
  smallOnMobile,
  size,
  flexibleHeight,
  zIndex,
  footer,
  onDismiss,
  children,
  title,
  titleClassName,
  subTitle,
  subTitleClassName,
}) => (
  <Modal
    id={id}
    className={className}
    contentContainerClassName={contentContainerClassName}
    smallOnMobile={smallOnMobile}
    size={size}
    flexibleHeight={flexibleHeight}
    zIndex={zIndex}
    footer={footer}
    onDismiss={onDismiss}
  >
    <div className="modal-header">
      <ModalCloseButton onClick={onDismiss} />
      {title ? (
        <h1
          className={titleClassName}
          dangerouslySetInnerHTML={{__html: title}}
        />
      ) : (
        ''
      )}
      {subTitle ? (
        <h2
          className={subTitleClassName}
          dangerouslySetInnerHTML={{__html: subTitle}}
        />
      ) : (
        ''
      )}
    </div>
    {children}
    <style jsx>{`
      .modal-header {
        position: relative;
        margin-top: 25px;
        padding: 20px 30px 30px;
        border-bottom: 1px solid #e2e3e4;
      }
      h1 {
        font-size: 24px;
        color: #373737;
      }
      h2 {
        font-size: 16px;
        line-height: 24px;
        color: #373737;
      }
    `}</style>
  </Modal>
);

const EnhancedCommonModal = React.memo(CommonModal);

export default EnhancedCommonModal;
