import {get} from 'lodash';

const mergePayloadToState = (state, action) => {
  const payload = get(action, 'payload');

  return {
    ...state,
    ...payload,
  };
};

export default mergePayloadToState;
