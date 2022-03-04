import React from 'react';

const mediaQueryToCheckMobile =
  window.matchMedia && window.matchMedia('(max-width: 959px)');

export const media = {
  isMobile: mediaQueryToCheckMobile.matches,
};

mediaQueryToCheckMobile.addListener(function (ev) {
  media.isMobile = ev.matches;
});

const MediaContext = React.createContext(mediaQueryToCheckMobile);

export default MediaContext;
