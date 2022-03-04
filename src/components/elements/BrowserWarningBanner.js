import React from 'react';

const isIe10OrBelow = () => navigator.userAgent.includes('MSIE');
const isIe11 = () => navigator.userAgent.includes('Trident/');

const BrowserWarningBanner = () => {
  const [
    browserWarningBannerVisible,
    setBrowserWarningBannerVisible,
  ] = React.useState(isIe11() || isIe10OrBelow());

  return browserWarningBannerVisible ? (
    <div
      className="pa3 flex items-center justify-center lh-copy tc white bg-brand pointer"
      onClick={() => {
        setBrowserWarningBannerVisible(false);
      }}
    >
      {isIe11()
        ? `You're using an outdated version of Internet Explorer that we do not support. We recommend using Chrome or Safari as your browser.`
        : 'Using Internet Explorer may provide a degraded experience on our platform. We recommend using Chrome or Safari as your browser.'}
    </div>
  ) : null;
};

export default BrowserWarningBanner;
