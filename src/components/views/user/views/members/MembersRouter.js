import {Route} from 'react-router-dom';
import React from 'react';

import MembersPage from './MembersPage';

const MembersRouter = () => (
  <Route component={MembersPage} path="/user/members" />
);

const EnhancedMembersRouter = React.memo(MembersRouter);

export default EnhancedMembersRouter;
