import {Route} from 'react-router-dom';
import {compose, pure, setDisplayName} from 'recompose';
import React from 'react';

import Page from './Page';

const enhance = compose(
  setDisplayName('user/invite-members/views/confirm/Router'),
  pure
);

export default enhance(() => (
  <Route component={Page} path="/user/invite-members/resend-all-confirm" />
));
