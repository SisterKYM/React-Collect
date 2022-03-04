import moment from 'moment';

const UserDobHelpers = {
  parse: dob => {
    if (!dob) {
      return null;
    }
    const date = moment(dob, 'MM/DD/YYYY');

    return {
      day: date.date(),
      month: date.month() + 1,
      year: date.year(),
    };
  },
  toString: dob => {
    if (!dob) {
      return '';
    }

    const res = moment(
      `${dob.month}/${dob.day}/${dob.year}`,
      'M/D/YYYY'
    ).format('MM/DD/YYYY');

    return res === 'Invalid date' ? '' : res;
  },
};

export default UserDobHelpers;
