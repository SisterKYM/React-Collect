import {get} from 'lodash';

const mapDeleteManager = (state, action) => {
  const id = get(action, 'payload.manager');

  return {
    ...state,
    managers: state.managers.filter(manager => manager.id !== id),
  };
};

export default mapDeleteManager;
