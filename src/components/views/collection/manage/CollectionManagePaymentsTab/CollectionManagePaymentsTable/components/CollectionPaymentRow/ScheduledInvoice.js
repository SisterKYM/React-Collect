import {IoMdSync} from 'react-icons/io';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import DateHelpers from 'helpers/DateHelpers';

const ScheduledInvoice = ({
  className,
  browser,
  dateStart,
  isFuture,
  method,
  reason,
}) => {
  const isMedium = browser.greaterThan.small;
  const isSmall = browser.greaterThan.extraSmall;

  return (
    <div
      className={cx(
        'f6 f9-s',
        isFuture ? 'scheduled-invoice-future-container' : 'flex',
        isSmall && 'flex-wrap',
        className
      )}
    >
      {isFuture ? (
        <div className="ml2 relative">
          <IoMdSync className="absolute top-0 left-0" size={14} />
          <span className="ml3">Includes Scheduled Payment</span>
        </div>
      ) : (
        <>
          <div className="w-40 w-30-ns ml2">
            <span>{dateStart}</span>
          </div>
          <div className="w-40">{method}</div>
          <div className="w-30">
            {reason && (
              <span
                className={cx(isSmall && !isMedium && 'ml2', isMedium && 'ml3')}
              >
                {` due to ${reason}`}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

ScheduledInvoice.propTypes = {
  browser: PropTypes.object,
  className: PropTypes.string,
  dateStart: DateHelpers.d2d2d4PropType,
  isFuture: PropTypes.bool,
  method: PropTypes.string,
  reason: PropTypes.string,
};

const EnhancedScheduledInvoice = React.memo(ScheduledInvoice);

export default EnhancedScheduledInvoice;
