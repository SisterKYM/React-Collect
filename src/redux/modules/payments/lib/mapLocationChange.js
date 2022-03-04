import {get} from 'lodash';

const mapLocationChange = (state, action) => {
  const pathname = get(action, 'payload.location.pathname', '');
  const preserveList = ['/collection/'];

  let preserve = false;
  preserveList.forEach(path => {
    if (pathname.includes(path)) {
      preserve = true;
    }
  });

  if (!preserve) {
    return {
      ...state,
      payment: null,
      payments: [],
    };
  }

  return state;
};

export default mapLocationChange;
