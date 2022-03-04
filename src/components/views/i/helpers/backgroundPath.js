import {get} from 'lodash';

const backgroundPath = location =>
  get(location, 'pathname', '').split('/i/')[0];

export default backgroundPath;
