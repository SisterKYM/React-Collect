const path = require('path');

const {
  addWebpackAlias,
  disableEsLint,
  override,
  useBabelRc,
} = require('customize-cra');

module.exports = {
  webpack: override(
    disableEsLint(),
    useBabelRc(),
    addWebpackAlias({
      'lodash-es': 'lodash',
    })
  ),
  devServer(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    // eslint-disable-next-line func-names
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      // Change the https certificate options to match your certificate, using the .env file to
      // set the file paths & passphrase.
      config.proxy = {
        '/api': {
          target: process.env.REACT_APP_META_PATH,
          secure: false,
          changeOrigin: true,
          cookieDomainRewrite: '',
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.14 Safari/537.36',
          },
          onProxyRes: (proxyRes, req, res) => {
            const sc = proxyRes.headers['set-cookie'];
            if (Array.isArray(sc)) {
              proxyRes.headers['set-cookie'] = sc.map(sc => {
                return sc
                  .split(';')
                  .filter(
                    v =>
                      v.trim().toLowerCase() !== 'secure' &&
                      !v.trim().startsWith('SameSite')
                  )
                  .join('; ');
              });
            }
          },
        },
      };

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
