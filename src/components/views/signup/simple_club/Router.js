import {Route} from 'react-router-dom';
import {compose, pure, setDisplayName} from 'recompose';
import React from 'react';

import SimpleClubSignUpPage from './Page';

const enhance = compose(
  setDisplayName('views/signup/simple_club/Router'),
  pure
);

export default enhance(() => (
  <Route exact path="/signup/simple_club" component={SimpleClubSignUpPage} />
));
