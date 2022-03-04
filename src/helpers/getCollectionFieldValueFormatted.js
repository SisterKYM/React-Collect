import moment from 'moment-timezone';
import {parsePhoneNumber} from 'libphonenumber-js';

import DateHelpers from 'helpers/DateHelpers';

const FIELD_CHOICE_DELIMITER = '|||';

const getCollectionFieldValueFormatted = ({
  field_type: fieldType,
  value,
} = {}) => {
  switch (fieldType) {
    case 'checkbox':
      return value.split(FIELD_CHOICE_DELIMITER).join(', ');
    case 'date':
      return DateHelpers.format(value);
    case 'time':
      return moment(value).tz(moment.tz.guess()).format('hh:mm A z');
    case 'phone': {
      try {
        const phoneNumber = parsePhoneNumber(value);
        return phoneNumber.isValid() ? phoneNumber.formatNational() : value;
      } catch {
        return value;
      }
    }
    default:
      return value;
  }
};

export default getCollectionFieldValueFormatted;
