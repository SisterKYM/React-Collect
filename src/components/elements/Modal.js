import React from 'react';
import cx from 'classnames';

import {Z_INDEX as curtainZindex} from 'elements/Curtain';

const stopEventPropagation = (e) => {
  e.stopPropagation();
};

const Modal = ({
  id,
  className,
  contentContainerClassName,
  smallOnMobile,
  size = 'LARGE',
  flexibleHeight = false,
  zIndex = curtainZindex + 4,
  footer,
  onDismiss,
  children,
}) => {
  const contentContainerMaxWidthClassName = React.useMemo(() => {
    switch (size) {
      case 'EXTRA_SMALL':
        return 'extra-small-max-width';
      case 'SMALL':
        return 'mw6';
      case 'MEDIUM':
        return 'mw7';
      case 'LARGE':
      default:
        return 'mw8';
    }
  }, [size]);

  return (
    <div id={id} className="container h-100 fixed absolute--fill">
      <div
        className="overlay fixed absolute--fill bg-dark-gray"
        onClick={() => {
          if (onDismiss) {
            onDismiss();
          }
        }}
      />
      <div
        className={cx(
          'modal w-100 w-80-l absolute left-0 right-0 center overflow-hidden br2',
          flexibleHeight ? 'h-100' : 'top-0 bottom-0 top-2-ns bottom-2-ns',
          contentContainerClassName,
          contentContainerMaxWidthClassName
        )}
      >
        <div className="w-100 h-100">
          <div
            className={cx(
              'modal-content-container h-100',
              !flexibleHeight && 'flex flex-column justify-center'
            )}
            onClick={() => {
              if (onDismiss) {
                onDismiss();
              }
            }}
          >
            <div
              className={cx(
                'flex-auto overflow-y-auto bg-white modal-shadow',
                flexibleHeight && 'h-auto-ns vertical-center br2',
                className,
                smallOnMobile ? '' : 'w-100 h-100',
                !footer && 'br2'
              )}
              onClick={stopEventPropagation}
            >
              {children}
            </div>
            {footer && <div onClick={stopEventPropagation}>{footer}</div>}
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          z-index: ${zIndex};
        }
        .modal-content-container {
          pointer-events: auto;
        }
        .vertical-center {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        :global(.overlay) {
          z-index: ${zIndex};
          opacity: 0.4;
        }
        :global(.modal) {
          border-radius: 4px;
          pointer-events: none;
          z-index: ${zIndex + 1};
          -webkit-overflow-scrolling: touch;
        }
        :global(.extra-small-max-width) {
          max-width: 24rem;
        }
      `}</style>
      <style global jsx>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Modal;
