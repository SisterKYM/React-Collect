import {IoIosArrowForward} from 'react-icons/io';
import cx from 'classnames';
import React from 'react';
import truncate from 'truncate';

import Button from 'elements/Button';
import Status from 'elements/Status';

const BottomBarWithButton = ({
  className,
  inactive,
  disabled,
  loading,
  buttonType,
  buttonTitle,
  errorMessage,
  status,
  onButtonClick,
}) => (
  <div
    className={cx(
      'bottom-bar-with-button-container flex ph3 items-center justify-end bg-white',
      className
    )}
  >
    <div className="flex pr3 items-center">
      {errorMessage && (
        <>
          <div className="dn db-ns mw6 mr3 tr brand">{errorMessage}</div>
          <div className="dn-ns mw6 mr3 tr brand">
            {truncate(errorMessage, 60)}
          </div>
        </>
      )}
      <Status status={loading ? 'pending' : status} />
    </div>
    <Button
      backgroundColorSet
      className={cx(
        'bottom-bar-submit-button-content-container',
        inactive ? 'gray-600 bg-gray-500' : 'white bg-brand'
      )}
      type={buttonType}
      disabled={disabled}
      onClick={onButtonClick}
    >
      <div className="flex justify-center items-center">
        {buttonTitle}
        <IoIosArrowForward size={14} />
      </div>
    </Button>
    <style jsx>{`
      .bottom-bar-with-button-container {
        height: 5rem;
      }
      :global(.bottom-bar-submit-button-content-container) {
        min-width: 10.375rem;
      }
    `}</style>
  </div>
);

const EnhancedBottomBarWithButton = React.memo(BottomBarWithButton);

export default EnhancedBottomBarWithButton;
