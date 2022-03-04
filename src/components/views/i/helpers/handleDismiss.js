import shortid from 'shortid';

import backgroundPath from './backgroundPath';

const handleDismiss = ({history, location} = {}) => state => {
  if (!history || !history.push || !location) {
    return false;
  }

  // hack for react-native WebView to detect url change
  window.location.hash = shortid.generate();

  return history.push({
    pathname: backgroundPath(location),
    state: {
      ...location.state,
      ...state,
    },
  });
};

export default handleDismiss;
