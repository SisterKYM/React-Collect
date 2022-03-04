const savePreloadedState = ({getState}) => next => action => {
  const returnValue = next(action);

  if (window.prerenderCloudIsServerSideRendering) {
    window.__PRELOADED_STATE__ = getState();
  }

  return returnValue;
};

export default savePreloadedState;
