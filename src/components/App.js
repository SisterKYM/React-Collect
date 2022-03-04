import {CacheProvider} from 'rest-hooks';
import {ClientContextProvider} from 'react-fetching-library';
import {Helmet} from 'react-helmet';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';
import React from 'react';
import queryString from 'query-string';

import {GET_SESSION} from 'redux/modules/session/constants';
import {BrowserWarningBanner, MobileAppBanner} from 'elements';
import {asyncConnect} from 'helpers';
import {getSession} from 'redux/modules/session/actions';
import config from 'config';
import ThemeProvider from 'theme/ThemeProvider';

import './style.css';
import AppRouter from './AppRouter';
import DefaultStyles from './DefaultStyles';
import GlobalStyles from './GlobalStyles';
import MediaContext, {media} from './MediaContext';
import fetchingLibraryClient from '../fetchingLibraryClient';

const App = ({location, ...props}) => {
  const bannerVisible =
    config.isCheddarUp &&
    !queryString.parse(location.search).hideSmartBanner &&
    !location.pathname.startsWith('/c/') &&
    !location.pathname.startsWith('/marketplace') &&
    !location.pathname.includes('/i/') &&
    location.pathname.replace(/\//g, '') !== 'collections';

  return (
    <>
      <Helmet>
        <title>{config.strings.headTitle}</title>
      </Helmet>
      <ClientContextProvider client={fetchingLibraryClient}>
        <CacheProvider>
          <ThemeProvider>
            <MediaContext.Provider value={media}>
              {bannerVisible && <MobileAppBanner />}
              <BrowserWarningBanner />
              <AppRouter location={location} {...props} />
            </MediaContext.Provider>
          </ThemeProvider>
        </CacheProvider>
      </ClientContextProvider>
      <GlobalStyles />
      <DefaultStyles />
    </>
  );
};

const enhance = compose(
  withRouter,
  asyncConnect((props) =>
    !props.location.pathname.includes('logout')
      ? [
          {
            key: GET_SESSION,
            promise: getSession,
          },
        ]
      : []
  )
);

const EnhancedApp = enhance(App);

export default EnhancedApp;
