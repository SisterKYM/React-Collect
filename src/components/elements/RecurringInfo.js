import {IoMdSync} from 'react-icons/io';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import RecurringPaymentFormatter from 'helpers/RecurringPaymentFormatter';

import RecurringOptionsAnnotation from './RecurringOptionsAnnotation';

const RecurringInfo = ({className, annotationHidden, data}) => {
  const recurringPaymentLabels = RecurringPaymentFormatter.getLabels(data);

  return (
    <div className={cx('f6 avenir-roman', className)}>
      <p className="relative pl3 gray-550">
        <IoMdSync className="absolute top-0 left-0 f6 brand" />
        This is a recurring payment.
      </p>
      <p className="mt3 lh-copy gray-550">
        <span className="gray-400">Starting</span>:{' '}
        {recurringPaymentLabels.start}
        <br />
        <span className="gray-400">Repeating Every</span>:{' '}
        {recurringPaymentLabels.repeat}
        <br />
        <span className="gray-400">Ending</span>: {recurringPaymentLabels.end}
      </p>
      {!annotationHidden && (
        <RecurringOptionsAnnotation
          noBold
          className="mt3 f6"
          recurringOptions={data}
        />
      )}
    </div>
  );
};

const EnhancedRecurringInfo = Object.assign(React.memo(RecurringInfo), {
  propTypes: {
    className: PropTypes.string,
    data: PropTypes.shape({
      ends: PropTypes.shape({
        payment_count: PropTypes.number,
        type: PropTypes.string,
      }),
      repeatInterval: PropTypes.string,
      start: PropTypes.shape({
        date: PropTypes.string,
        type: PropTypes.string,
      }),
    }),
  },
});

export default EnhancedRecurringInfo;
