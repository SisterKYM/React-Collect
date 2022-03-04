import React from 'react';

const useToggle = (initialState = false) => {
  const [state, setState] = React.useState(initialState);

  const toggle = React.useMemo(
    () => ({
      on: () => {
        setState(true);
      },
      off: () => {
        setState(false);
      },
      switch: () => {
        setState(prevState => !prevState);
      },
    }),
    []
  );

  return [state, toggle];
};

export default useToggle;
