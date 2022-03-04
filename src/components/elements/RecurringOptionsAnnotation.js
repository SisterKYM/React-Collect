import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';

import DateHelpers from 'helpers/DateHelpers';
import RecurringPaymentFormatter from 'helpers/RecurringPaymentFormatter';

const RecurringOptionsAnnotation = ({className, recurringOptions, noBold}) => {
  const Text = noBold ? 'span' : 'b';
  const annotation = React.useMemo(
    () =>
      recurringOptions
        ? RecurringPaymentFormatter.getAnnotation({
            ...recurringOptions,
            start: {
              ...recurringOptions.start,
              date: moment(recurringOptions.start.date),
            },
          })
        : {},
    [recurringOptions]
  );

  return (
    <p className={cx('f7 lh-copy avenir-roman gray-600', className)}>
      Payment will be automatically charged
      {annotation.repeatInterval && <Text> {annotation.repeatInterval}</Text>}
      {annotation.start && <Text>{annotation.start}</Text>}
      {annotation.ends && (
        <>
          {' '}
          and ending after <Text>{annotation.ends}</Text>
        </>
      )}
      .
    </p>
  );
};

const EnhancedRecurringPaymentConfigAnnotation = Object.assign(
  React.memo(RecurringOptionsAnnotation),
  {
    propTypes: {
      className: PropTypes.string,
      noBold: PropTypes.bool,
      end: PropTypes.shape({
        date: DateHelpers.d2d2d4PropType,
        payments: PropTypes.number,
      }),
      repeat: PropTypes.shape({
        day: PropTypes.number,
        period: PropTypes.string,
        quantity: PropTypes.number,
      }),
      start: PropTypes.shape({
        date: PropTypes.date,
        dayOfPayment: PropTypes.bool,
      }),
    },
  }
);

export default EnhancedRecurringPaymentConfigAnnotation;
