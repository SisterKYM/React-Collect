import {SESSION} from 'redux/modules/session/constants';
import {storage} from 'helpers';

const getInitialState = () => {
  const session = storage.get(SESSION);

  let initialState = {session};

  const preloadedState = window.__PRELOADED_STATE__;

  if (preloadedState && !window.prerenderCloudIsServerSideRendering) {
    delete window.__PRELOADED_STATE__;

    initialState = {
      ...initialState,
      preloadedState,
    };
  }

  return initialState;
};

export default getInitialState;
