import React from 'react';
import cx from 'classnames';

import {Z_INDEX as curtainZindex} from 'elements/Curtain';

const PromptModal = ({
  id,
  className,
  contentContainerClassName,
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
          'modal absolute left-0 right-0 center overflow-hidden',
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
          >
            <div
              className={cx(
                'flex-auto overflow-y-auto bg-white vertical-center w-100 br2 input-prompt-box',
                className
              )}
            >
              {children}
            </div>
            {footer}
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
          border: 0.25px solid #9d9d9d;
        }
        :global(.overlay) {
          z-index: ${zIndex};
          opacity: 0.4;
        }
        :global(.modal) {
          pointer-events: none;
          max-width: 387px;
          z-index: ${zIndex + 1};
          -webkit-overflow-scrolling: touch;
        }
        :global(.extra-small-max-width) {
          max-width: 24rem;
        }

        @media screen and (min-width: 30em) {
          .vertical-center {
            max-height: 90%;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          overflow-y: hidden;
          padding-right: 15px;
        }
      `}</style>
    </div>
  );
};

export default PromptModal;
