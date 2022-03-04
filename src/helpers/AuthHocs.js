import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import {mapProps, wrapDisplayName} from 'recompose';
import _ from 'lodash';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

import config from 'config';
import PendingPage from 'views/PendingPage';

const withoutRedirectProp = mapProps(({redirect, ...props}) => props);

const locationHelper = locationHelperBuilder({});

const authenticatingSelector = (state) =>
  (state.session && state.session.sessionLoading === undefined) ||
  !state.session ||
  (state.session && state.session.sessionLoading);

const AuthHocs = {
  requireAuthenticated: (
    Component,
    redirectPath = '/login',
    allowRedirectBack = true
  ) => {
    const requireAuthRedirect = connectedRouterRedirect({
      redirectPath,
      allowRedirectBack,
      authenticatingSelector,
      authenticatedSelector: (state) =>
        Boolean(state.session) &&
        !state.session.sessionLoading &&
        (Boolean(state.session.user) ||
          _.get(state.session, 'session.expires_in') <= 0),
      wrapperDisplayName: wrapDisplayName(Component, 'requireAuthenticated'),
      AuthenticatingComponent: PendingPage,
    });
    const ComponentWithoutRedirectProp = withoutRedirectProp(Component);

    return requireAuthRedirect(ComponentWithoutRedirectProp);
  },
  requireGuest: (Component) => {
    const requireGuestRedirect = connectedRouterRedirect({
      authenticatingSelector,
      authenticatedSelector: (state) =>
        !state.session ||
        (!state.session.sessionLoading && !state.session.user) ||
        (state.session && _.get(state.session, 'session.expires_in') <= 0),
      allowRedirectBack: false,
      redirectPath: (state, ownProps) => {
        const redirectPath =
          locationHelper.getRedirectQueryParam(ownProps) || '/collections';
        const userId = state?.session?.user?.id;

        return ownProps.location.pathname.includes('/signup') &&
          userId &&
          !redirectPath.includes('/invitations/manager')
          ? `/collections/${userId}/welcome`
          : redirectPath;
      },
      wrapperDisplayName: wrapDisplayName(Component, 'requireGuest'),
      AuthenticatingComponent: PendingPage,
    });

    const ComponentWithoutRedirectProp = withoutRedirectProp(Component);

    return requireGuestRedirect(ComponentWithoutRedirectProp);
  },
};

export default AuthHocs;
