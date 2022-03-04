import {useEffect, useMemo, useState} from 'react';

const useGenericMedia = (query) => {
  const [state, setState] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(Boolean(mql.matches));
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
    }
    setState(mql.matches);

    return () => {
      mounted = false;
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange);
      }
    };
  }, [query]);

  return state;
};

const useMedia = () => {
  const notSmall = useGenericMedia('(min-width: 30em)');
  // const smallLandscape = useGenericMedia(
  //   '(max-width: 900px) and (orientation: landscape)'
  // );
  const smallLandscape = useGenericMedia('(max-width: 900px)');
  const medium = useGenericMedia('(min-width: 30em) and (max-width: 60em)');
  const large = useGenericMedia('(min-width: 60em)');

  // special
  const showSideElements = useGenericMedia('(min-width: 1185px)');

  const res = useMemo(
    () => ({
      notSmall,
      smallLandscape,
      medium,
      large,
      showSideElements,
    }),
    [large, medium, notSmall, smallLandscape, showSideElements]
  );

  return res;
};

export default useMedia;
