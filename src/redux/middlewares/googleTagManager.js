import {get} from 'lodash';

const googleTagManager = () => (next) => (action) => {
  const gtm = get(action, 'meta.googleTagManager', null);

  if (!gtm) {
    return next(action);
  }

  if (gtm.event === 'LOGGED_OUT') {
    window.dataLayer = [];
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(gtm);

  return next(action);
};

export default googleTagManager;
