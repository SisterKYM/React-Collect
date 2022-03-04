import {get} from 'lodash';

const propsMapper = ({match, ...props}) => ({
  ...props,
  cid: Number(get(match, 'params.collection', 0)),
});

export default propsMapper;
