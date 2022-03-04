import React, {useState} from 'react';

import {CollectionsTopNav} from 'elements';
import {GrowlAlertsContainer} from 'containers';
import useMedia from 'hooks/useMedia';

import {
  CollectionsSidebarMobile,
  CollectionsTopNavMobile,
} from './CollectionsMobileLayout/components';

import CollectionNavbar from './components/SecondaryNavbar';

const CollectionCenterLayout = ({collection, children, footer}) => {
  const media = useMedia();

  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <GrowlAlertsContainer />
      <div className="vh-100 flex flex-column">
        <div className="main h-100 flex-auto overflow-auto">
          {!media.notSmall && (
            <div>
              <CollectionsTopNavMobile setSidebarVisible={setSidebarVisible} />
              <div className="flex-fill relative">
                <CollectionsSidebarMobile sidebarVisible={sidebarVisible} />
              </div>
            </div>
          )}
          {media.notSmall && <CollectionsTopNav />}
          <CollectionNavbar collection={collection} />
          {children}
        </div>
        {footer && <div className="footer">{footer}</div>}
        <style jsx>{`
          .main {
            overscroll-behavior: none;
            -webkit-overflow-scrolling: touch;
          }
          .footer {
            flex-shrink: 0;
          }
        `}</style>
      </div>
    </>
  );
};

const EnhancedCollectionCenterLayout = React.memo(CollectionCenterLayout);

export default EnhancedCollectionCenterLayout;
