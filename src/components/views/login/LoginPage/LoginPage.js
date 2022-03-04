import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {get} from 'lodash';
import React from 'react';

import {BasicLayout} from 'layout';
import {LOGIN} from 'redux/modules/session/constants';
import {LoginSignupNav, GuestDrawerNav, Status} from 'elements';
import {PrimaryNavLinksContainer} from 'containers';
import {formatLoginError} from 'helpers/apiResponseHelpers';
import {login} from 'redux/modules/session/actions';

import {LoginForm} from './components';

const LoginPage = ({login: loginAction, error, status, location, disabled}) => (
  <BasicLayout
    primaryNavbar={{
      leftComponent: <PrimaryNavLinksContainer />,
      rightComponent: <LoginSignupNav location={location} />,
    }}
    drawerMenuNav={<GuestDrawerNav location={location} />}
  >
    <div className="content-container">
      <div className="ph2 pb5 w-100 w-50-m w-third-l center">
        <div className="pt5 tc">
          <h1 className="mb3">Welcome back!</h1>
          {!process.env.REACT_APP_SELF_SIGNUP_DISABLED && (
            <p className="f-regular lh-copy mb4">
              Don&#8217;t have an account?
              <br />
              <Link
                to={{
                  pathname: '/signup',
                  search: get(location, 'search'),
                }}
              >
                Create one
              </Link>
            </p>
          )}
        </div>
        <LoginForm status={status} onSubmit={loginAction} disabled={disabled} />
        <Link to="/login/forgot-password" className="db mv4 tc f6 avenir-roman">
          Forgot your password?
        </Link>
        <div className="flex mt4 justify-center">
          <Status status={status} messages={{failure: error}} />
        </div>
      </div>
    </div>
  </BasicLayout>
);

const enhance = connect(
  ({async: {statuses, errors}}) => {
    const status = statuses[LOGIN];

    return {
      status,
      disabled: status === 'pending',
      error: formatLoginError(errors[LOGIN]),
    };
  },
  {login}
);

const EnhancedLoginPage = enhance(LoginPage);

export default EnhancedLoginPage;
