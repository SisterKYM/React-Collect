import {get} from 'lodash';

const mapGetPayments = (state, action) => ({
  ...state,
  search: get(action, 'payload.query.search', ''),
  sorted: {
    ...state.sorted,
    direction: get(action, 'payload.query.direction', null),
    sort: get(action, 'payload.query.sort', null),
  },
  status: get(action, 'payload.query.status'),
});

export default mapGetPayments;
