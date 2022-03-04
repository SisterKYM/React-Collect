import _ from 'lodash';

const isFieldNeeded = (fields, field) =>
  _.findIndex(fields, fl => fl.includes(field)) > -1;

export default isFieldNeeded;
