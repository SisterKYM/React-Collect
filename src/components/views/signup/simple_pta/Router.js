import {Route} from 'react-router-dom';
import {compose, pure, setDisplayName} from 'recompose';
import React from 'react';

import SimplePtaSignUpPage from './Page';

const enhance = compose(
  setDisplayName('views/signup/simple_pta/Router'),
  pure
);

export default enhance(() => (
  <Route exact path="/signup/simple_pta" component={SimplePtaSignUpPage} />
));
