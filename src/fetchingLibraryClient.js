import {createCache, createClient} from 'react-fetching-library';

import config from 'config';

const requestCheddarUpApiInterceptor = () => async (action) => ({
  ...action,
  headers: {
    'Client-Id': config.clientId,
  },
  credentials: 'include',
  endpoint: `/api${action.endpoint}`,
});

const cacheProvider = createCache(
  (action) => action.method === 'GET',
  (response) => new Date().getTime() - response.timestamp < 10000
);

const fetchingLibraryClient = createClient({
  requestInterceptors: [requestCheddarUpApiInterceptor],
  responseInterceptors: [],
  cacheProvider,
});

export default fetchingLibraryClient;
