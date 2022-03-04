import {get} from 'lodash';

import {GET_MEMBERS} from 'redux/modules/members/constants';
import {getMembers} from 'redux/modules/members/actions';

const connector = props => [
  {
    key: GET_MEMBERS,
    payload: {collection: get(props, 'match.params.collection', '')},
    promise: getMembers,
  },
];

export default connector;
