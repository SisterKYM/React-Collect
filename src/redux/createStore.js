import {applyMiddleware, compose, createStore} from 'redux';
import {responsiveStoreEnhancer} from 'redux-responsive';

import middlewares from 'redux/middlewares';
import sagaMiddleware from 'redux/middlewares/saga';
import sagas from 'redux/sagas';
import {LOGOUT} from 'redux/modules/session/constants';
import {success} from 'redux/modules/async/helpers';

import DevTools from './DevTools';
import createReducer from './createReducer';

const createCheddarUpStore = (initialState) => {
  const appReducer = createReducer();
  const rootReducer = (state, action) => {
    if (action.type === success(LOGOUT)) {
      const router = state?.router;
      state = router ? {router} : undefined;
    }

    return appReducer(state, action);
  };
  const enhancer = compose(
    responsiveStoreEnhancer,
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : DevTools.instrument()
  );

  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(sagas);

  return store;
};

export default createCheddarUpStore;
