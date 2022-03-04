import {createTracker} from 'redux-segment';
import {routerMiddleware} from 'connected-react-router';
import storageMiddleware from 'redux-simplestorage';

import {actionsMapper} from 'helpers/segment';
import appHistory from 'appHistory';

import googleTagManager from './googleTagManager';
import sagaMiddleware from './saga';
import savePreloadedState from './savePreloadedState';
import sendinblue from './sendinblue';

const tracker = createTracker(actionsMapper);
const historyMiddleware = routerMiddleware(appHistory);

const middlewares = [
  sagaMiddleware,
  storageMiddleware,
  savePreloadedState,
  googleTagManager,
  sendinblue,
  historyMiddleware,
  tracker,
];

export default middlewares;
