import {get} from 'lodash';
import moment from 'moment';

import DateHelpers from 'helpers/DateHelpers';

const getRepeatPeriod = parsedRepeat => {
  if (parsedRepeat.asMonths) {
    return 'month';
  }
  if (parsedRepeat.asWeeks) {
    return 'week';
  }

  return '';
};

const RecurringPaymentFormatter = {
  getAnnotationStartFormatted: ({type, date}) => {
    switch (type) {
      case 'date':
        return ` (beginning no earlier than ${DateHelpers.format(date)})`;
      case 'first_payment':
        return ' starting on the first day of payment';
      default:
        return '';
    }
  },
  getAnnotationEndFormatted: ends =>
    !ends || !ends.payment_count
      ? ''
      : `${ends.payment_count} payment${ends.payment_count > 1 ? 's' : ''}`,
  getAnnotationRepeatFormatted: (repeatInterval, start) => {
    if (!repeatInterval) {
      return '';
    }

    const repeatIntervalParsed = DateHelpers.parseDuration(repeatInterval);
    const period = repeatIntervalParsed.asMonths ? 'month' : 'week';
    const repeat = {
      period,
      count:
        period === 'month'
          ? repeatIntervalParsed.asMonths
          : repeatIntervalParsed.asWeeks,
    };

    let day = '';
    const startDate = start.type === 'date' ? start.date : null;

    if (startDate) {
      day =
        repeat.period === 'month'
          ? `on day ${moment(startDate).format('D')}`
          : `starting on ${moment(startDate).format('dddd')}`;
    }

    return `every ${repeat.count === 1 ? '' : repeat.count} ${repeat.period}${
      repeat.count === 1 ? '' : 's'
    } ${day}`;
  },
  getAnnotation: recurringOptions =>
    recurringOptions
      ? {
          start: RecurringPaymentFormatter.getAnnotationStartFormatted(
            recurringOptions.start
          ),
          ends: RecurringPaymentFormatter.getAnnotationEndFormatted(
            recurringOptions.ends
          ),
          repeatInterval: RecurringPaymentFormatter.getAnnotationRepeatFormatted(
            recurringOptions.repeatInterval,
            recurringOptions.start
          ),
        }
      : {},
  getLabelsStartFormatted: start =>
    start && start.date && start.type === 'date'
      ? `On ${DateHelpers.format(start.date)}`
      : 'First day of payment',
  getLabelsEndFormatted: end => {
    if (!end) {
      return '';
    }

    return end.type === 'never'
      ? 'Never'
      : `After ${end.payment_count} payment${
          end.payment_count === 1 ? '' : 's'
        }`;
  },
  getLabelsRepeatFormatted: repeat => {
    const parsed = DateHelpers.parseDuration(repeat);
    let period = '';
    let quantity = 0;

    if (parsed.asMonths !== undefined) {
      period = 'Month';
      quantity = parsed.asMonths;
    }

    if (parsed.asWeeks !== undefined) {
      period = 'Week';
      quantity = parsed.asWeeks;
    }

    const end = quantity === 1 ? '' : 's';

    return `${quantity} ${period}${end}`;
  },
  getLabelsNextFormatted: ({start, repeat}) => {
    if (!start || !repeat) {
      return '';
    }

    const duration = moment.duration(repeat);
    const startDate =
      get(start, 'type') === 'date' ? get(start, 'date') : new Date();

    return DateHelpers.format(
      moment(startDate)
        .add(duration)
        .toDate()
    );
  },
  getLabels: parsedRecurringPayment => ({
    start: RecurringPaymentFormatter.getLabelsStartFormatted(
      parsedRecurringPayment.start
    ),
    end: RecurringPaymentFormatter.getLabelsEndFormatted(
      parsedRecurringPayment.ends
    ),
    repeat: RecurringPaymentFormatter.getLabelsRepeatFormatted(
      parsedRecurringPayment.repeatInterval
    ),
    next: RecurringPaymentFormatter.getLabelsNextFormatted({
      start: parsedRecurringPayment.start,
      repeat: parsedRecurringPayment.repeatInterval,
    }),
  }),
  parseEnd: end =>
    Boolean(end) && end.type === 'payment_count'
      ? {
          payments: end.payment_count,
        }
      : {},
  parseRepeat: repeat => {
    const parsedRepeat = DateHelpers.parseDuration(repeat);

    return {
      period: getRepeatPeriod(parsedRepeat),
      quantity: parsedRepeat.asMonths || parsedRepeat.asWeeks,
    };
  },
  parseRecurringPayment: recurringPayment => ({
    start: recurringPayment.start,
    end: RecurringPaymentFormatter.parseEnd(
      recurringPayment.end || recurringPayment.ends
    ),
    repeat: RecurringPaymentFormatter.parseRepeat(
      recurringPayment.repeat || recurringPayment.repeatInterval
    ),
  }),
};

export default RecurringPaymentFormatter;
