import React, {useCallback} from 'react';

import {CollectionsSidebarMobile, CollectionsTopNavMobile} from './components';

const CollectionsLayout = ({children}) => {
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const closeSidebar = useCallback(() => {
    setSidebarVisible(false);
  }, []);

  return (
    <>
      <div className="flex flex-column vh-100">
        <CollectionsTopNavMobile setSidebarVisible={setSidebarVisible} />
        <div className="flex-fill relative">
          <CollectionsSidebarMobile sidebarVisible={sidebarVisible} />
          <div
            className="flex-fill flex flex-column content"
            onClick={closeSidebar}
          >
            {children}
          </div>
        </div>
      </div>
      <style jsx>{`
        .content {
          padding: 0;
        }
      `}</style>
    </>
  );
};

const EnhancedCollectionsLayout = React.memo(CollectionsLayout);

export default EnhancedCollectionsLayout;
