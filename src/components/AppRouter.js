import {Route, Switch} from 'react-router-dom';
import posed, {PoseGroup} from 'react-pose';
import React from 'react';

import {Status} from 'elements';
import AuthHocs from 'helpers/AuthHocs';
import config from 'config';
import NotFoundPage from 'views/NotFoundPage';
import SessionTimeoutPage from 'views/SessionTimeoutPage';
import usePrevious from 'hooks/usePrevious';

const LazyCollectionRouter = React.lazy(() => import('views/collection'));
const LazyCollectionsRouter = React.lazy(() => import('views/collections'));
const LazyInvitationsRouter = React.lazy(() =>
  import('views/invitations/Router')
);
const LazyLogoutRouter = React.lazy(() => import('views/logout'));
const LazyMediaRouter = React.lazy(() => import('views/media/Router'));
const LazyUserRouter = React.lazy(() => import('views/user/Router'));
const LazyAccountPage = React.lazy(() => import('views/account'));
const LazyWithdrawRouter = React.lazy(() => import('views/withdraw'));
const LazyLoginRouter = React.lazy(() => import('views/login'));
const LazyMarketplaceRouter = React.lazy(() => import('views/marketplace'));
const LazyOrgsRouter = React.lazy(() => import('views/orgs/Router'));
const LazySignUpRouter = React.lazy(() => import('views/signup/Router'));
const LazyCheckoutRouter = React.lazy(() => import('views/c'));
const LazyContactPage = React.lazy(() => import('views/contact'));
const LazyMePage = React.lazy(() => import('views/MePage'));
const LazyPhoneRouter = React.lazy(() => import('views/phone/Router'));
const LazyOverlayRouter = React.lazy(() => import('views/i/Router'));
const LazyOrgLandingsRouter = React.lazy(() => import('views/org-landings'));
const LazyPayerHelpPage = React.lazy(() => import('views/c/PayerHelpPage'));
const LazyPayerSharePage = React.lazy(() => import('views/c/PayerSharePage'));
const LazyThankYouPage = React.lazy(() => import('views/ThankYouPage'));
const WithGuestLazyLoginRouter = AuthHocs.requireGuest(LazyLoginRouter);
const WithGuestLazyOrgsRouter = AuthHocs.requireGuest(LazyOrgsRouter);
const WithGuestLazySignUpRouter = AuthHocs.requireGuest(LazySignUpRouter);
const WithAuthSessionTimeoutPage = AuthHocs.requireAuthenticated(
  SessionTimeoutPage
);
const WithAuthLazyCollectionRouter = AuthHocs.requireAuthenticated(
  LazyCollectionRouter
);
const WithAuthLazyCollectionsRouter = AuthHocs.requireAuthenticated(
  LazyCollectionsRouter
);
const WithAuthLazyInvitationsRouter = AuthHocs.requireAuthenticated(
  LazyInvitationsRouter,
  '/signup'
);
const WithGuestLazyInvitationsRouter = AuthHocs.requireGuest(
  LazyInvitationsRouter
);
const WithAuthLazyLogoutRouter = AuthHocs.requireAuthenticated(
  LazyLogoutRouter,
  '/login',
  false
);
const WithAuthLazyMarketplaceRouter = AuthHocs.requireAuthenticated(
  LazyMarketplaceRouter
);
const WithAuthLazyMediaRouter = AuthHocs.requireAuthenticated(LazyMediaRouter);
const WithAuthLazyUserRouter = AuthHocs.requireAuthenticated(LazyUserRouter);
const WithAuthLazyAccountPage = AuthHocs.requireAuthenticated(LazyAccountPage);
const WithAuthLazyWithdrawRouter = AuthHocs.requireAuthenticated(
  LazyWithdrawRouter
);

const PoseContainer = posed.div();

const renderRootRoute = () => {
  window.location = config.links.homePageRedirect;

  return null;
};

const AppRouter = ({location}) => {
  const [previousPath, setPreviousPath] = React.useState('');
  const prevPathname = usePrevious(location.pathname);

  React.useEffect(() => {
    setPreviousPath(prevPathname);
  }, [prevPathname]);

  const renderCollectionRoute = React.useCallback(
    (props) => (
      <WithAuthLazyCollectionRouter {...props} previousPath={previousPath} />
    ),
    [previousPath]
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex vh-100 flex-auto justify-center items-center">
          <Status status="pending" />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" render={renderRootRoute} />
        <Route path="/c/:collection" component={LazyCheckoutRouter} />
        <Route path="/collection" render={renderCollectionRoute} />
        {/* {session?.capabilities?.myCollectionsVersionTwoEnabled ? ( */}
        <Route path="/collections" component={WithAuthLazyCollectionsRouter} />
        {/* ) : (
          <Route
            path="/collections"
            component={WithAuthLazyOldCollectionsRouter}
          />
        )} */}
        <Route path="/contact" component={LazyContactPage} />
        <Route path="/me/:slug" component={LazyMePage} />
        <Route path="/withdraw" component={WithAuthLazyWithdrawRouter} />
        <Route path="/user" component={WithAuthLazyUserRouter} />
        <Route path="/invitations" component={WithAuthLazyInvitationsRouter} />
        <Route path="/media" component={WithAuthLazyMediaRouter} />
        <Route path="/logout" component={WithAuthLazyLogoutRouter} />
        {!process.env.REACT_APP_SELF_SIGNUP_DISABLED && (
          <Route path="/signup" component={WithGuestLazySignUpRouter} />
        )}
        <Route path="/orgs" component={WithGuestLazyOrgsRouter} />
        <Route path="/login" component={WithGuestLazyLoginRouter} />
        <Route path="/marketplace" component={WithAuthLazyMarketplaceRouter} />
        <Route path="*/i" component={LazyOrgLandingsRouter} />
        <Route path="/invitations" component={WithGuestLazyInvitationsRouter} />
        <Route path="/thankyou" component={LazyThankYouPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <PoseGroup>
        <PoseContainer key={location.pathname}>
          <Switch location={location}>
            <Route
              path="*/session-timeout"
              component={WithAuthSessionTimeoutPage}
            />
            <Route path="*/phone" component={LazyPhoneRouter} />
            <Route path="*/i" component={LazyOverlayRouter} />
            <Route path="*/my-account" component={WithAuthLazyAccountPage} />
            <Route path="/me/*/help" component={LazyPayerHelpPage} />
            <Route
              path="/me/:user/share"
              component={(routeProps) => <LazyPayerSharePage {...routeProps} />}
            />
          </Switch>
        </PoseContainer>
      </PoseGroup>
    </React.Suspense>
  );
};

export default AppRouter;
