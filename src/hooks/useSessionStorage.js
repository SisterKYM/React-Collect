import React from 'react';

const useSessionStorage = (key, initialValue, raw) => {
  const [state, setState] = React.useState(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key);
      if (typeof sessionStorageValue !== 'string') {
        sessionStorage.setItem(
          key,
          raw ? String(initialValue) : JSON.stringify(initialValue)
        );

        return initialValue;
      }

      return raw
        ? sessionStorageValue
        : JSON.parse(sessionStorageValue || 'null');
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. JSON.parse and JSON.stringify
      // cat throw, too.
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state);
      sessionStorage.setItem(key, serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. Also JSON.stringify can throw.
    }
  });

  const clearStorage = React.useCallback(() => {
    sessionStorage.removeItem(key);
    setState(null);
  }, [key]);

  return [state, setState, clearStorage];
};

export default useSessionStorage;
