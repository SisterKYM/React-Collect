import {get} from 'lodash';

const mapLocationChange = (state, action) => {
  const pathname = get(action, 'payload.location.pathname', '');
  const preserveList = ['/collection/', '/media/'];

  let preserve = false;
  preserveList.forEach(path => {
    if (pathname.includes(path)) {
      preserve = true;
    }
  });

  if (!preserve) {
    return {
      ...state,
      collection: null,
    };
  }

  return state;
};

export default mapLocationChange;
