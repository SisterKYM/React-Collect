import {sortBy} from 'lodash';

const normalizeGetFieldsResponse = fields => sortBy(fields, ['position']);

export default normalizeGetFieldsResponse;
