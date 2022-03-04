// import 'helpers/debug/wydr';
import 'blueimp-canvas-to-blob';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
import {StripeProvider} from 'react-stripe-elements';
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import appHistory from 'appHistory';
import createStore from 'redux/createStore';
import getInitialState from 'redux/getInitialState';

import './init';
import * as serviceWorker from './serviceWorker';

const initialState = getInitialState();
const store = createStore(initialState);

ReactDOM.render(
  <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
    <Provider store={store}>
      <ConnectedRouter history={appHistory}>
        <App />
      </ConnectedRouter>
    </Provider>
  </StripeProvider>,
  document.querySelector('#root')
);

serviceWorker.unregister();
