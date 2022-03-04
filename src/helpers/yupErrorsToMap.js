import _ from 'lodash';

const yupErrorsToMap = error =>
  _.fromPairs(error.inner.map(({path, message}) => [path, message]));

export default yupErrorsToMap;
