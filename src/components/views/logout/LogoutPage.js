import {RotatingPlane} from 'better-react-spinkit';
import {useDispatch} from 'react-redux';
import React from 'react';

import {BasicLayout} from 'layout';
import {UserDrawerContainer} from 'containers';
import {logout} from 'redux/modules/session/actions';

const LogoutPage = ({onLogout}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLogout]);

  return (
    <BasicLayout drawerMenuNav={<UserDrawerContainer />}>
      <div className="logout-page-container flex h-100 justify-center items-center">
        <div className="flex flex-column justify-center items-center pv5">
          <h4 className="mb3">Logging out...</h4>
          <RotatingPlane />
        </div>
        <style jsx>{`
          .logout-page-container {
            min-height: 90vh;
          }
        `}</style>
      </div>
    </BasicLayout>
  );
};

const EnhancedLogoutPage = React.memo(LogoutPage);

export default EnhancedLogoutPage;
