import React from 'react';
import config from 'config';

import CubeReversed from 'theme/images/CubeReversed.svg';

import FooterNav from './FooterNav';

const Footer = () => (
  <div className="flex flex-column pv4 items-center gray-100 bg-mid-gray">
    <p className="f-regular mb2 avenir-light">
      Collect for anything with {config.strings.name}.
    </p>
    <div className="mb4">
      <FooterNav />
    </div>
    <img alt="Cube reversed" src={CubeReversed} />
    <style jsx>{`
      img {
        width: 54px;
      }
    `}</style>
  </div>
);

const EnhancedFooter = React.memo(Footer);

export default EnhancedFooter;
