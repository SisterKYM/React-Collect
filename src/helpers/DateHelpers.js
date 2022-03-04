import _ from 'lodash';
import moment from 'moment';

const DATE_FORMAT_DEFAULT = 'MM/DD/YYYY';

const isFloat = (number) =>
  _.isNumber(number) ? Math.floor(number) !== number : false;

const DateHelpers = {
  format: (date, format) =>
    !date ? '' : moment(date).format(format || DATE_FORMAT_DEFAULT),
  isd2d2d4: (string = '') =>
    string.length === 10 && Boolean(/(?:\d{2}\/){2}\d{4}/.test(string)),
  parseDuration: (candidate) => {
    if (!candidate) {
      return {};
    }

    const asMonths = moment.duration(candidate).asMonths();
    const asWeeks = moment.duration(candidate).asWeeks();
    const asYears = moment.duration(candidate).asYears();

    return {
      asWeeks:
        !isFloat(asWeeks) &&
        !candidate.includes('M') &&
        !candidate.includes('Y')
          ? asWeeks
          : undefined,
      asMonths: isFloat(asMonths) ? undefined : asMonths,
      asYears: isFloat(asYears) ? undefined : asYears,
    };
  },
  d2d2d4PropType: (props, propName, displayName) => {
    const prop = props[propName];

    if (!prop) {
      return undefined;
    }

    if (!DateHelpers.isd2d2d4(prop)) {
      return new Error(
        `The property "${propName}" in ${displayName} should have ${DATE_FORMAT_DEFAULT} format.`
      );
    }

    if (prop.length > DATE_FORMAT_DEFAULT.length) {
      return new Error(
        `The property "${propName}" in ${displayName} should have ${DATE_FORMAT_DEFAULT.length} characters.`
      );
    }

    if (typeof prop !== 'string') {
      return new Error(`The property "${propName}" must be string.`);
    }

    return undefined;
  },
};

export default DateHelpers;
