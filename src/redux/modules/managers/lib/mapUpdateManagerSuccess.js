import {findIndex} from 'lodash';

const mapUpdateManagerSuccess = (state, action) => {
  const {payload: updatedManager} = action;
  const updatedManagerIndex = findIndex(state.managers, {
    id: updatedManager.id,
  });

  const updatedManagers = state.managers.slice();
  updatedManagers[updatedManagerIndex] = updatedManager;

  return {
    managers: updatedManagers,
  };
};

export default mapUpdateManagerSuccess;
