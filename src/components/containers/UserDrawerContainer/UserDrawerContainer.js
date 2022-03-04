import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';

import {UserDrawer} from './components';

const UserDrawerContainer = () => {
  const location = useLocation();
  const session = useSelector(state => state.session);

  return <UserDrawer location={location} session={session} />;
};

const EnhancedUserDrawerContainer = React.memo(UserDrawerContainer);

export default EnhancedUserDrawerContainer;
