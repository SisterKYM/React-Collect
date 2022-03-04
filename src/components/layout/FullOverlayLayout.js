import React from 'react';
import cx from 'classnames';

import {CloseOverlayButton} from 'elements';
import Layout from 'layout/Layout';

const FullOverlayLayout = ({className, close, fixedBottom, children}) => (
  <Layout>
    <div
      className={cx(
        'full-overlay-layout-container min-vh-100 bg-white',
        className
      )}
    >
      {close && (
        <div className="absolute top-0 right-0 ph3 ph4-ns pv2 pv4-ns z-1">
          <CloseOverlayButton size={32} {...close} />
        </div>
      )}
      {children}
    </div>
    {fixedBottom && (
      <div className="fixed bottom-0 w-100 bg-white">{fixedBottom}</div>
    )}
    <style jsx>{`
      .full-overlay-layout-container {
        min-width: 100vw;
      }
    `}</style>
  </Layout>
);

const EnhancedFullOverlayLayout = React.memo(FullOverlayLayout);

export default EnhancedFullOverlayLayout;
