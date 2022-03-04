import React from 'react';

import {CollectionsSidebar, CollectionsTopNav} from 'elements';

const CollectionsLayout = ({children}) => (
  <>
    <div className="vh-100 flex flex-column">
      <CollectionsTopNav />
      <div className="relative">
        <div className="collections-sidebar__container">
          <CollectionsSidebar />
        </div>
        <div className="flex-auto flex flex-column content">{children}</div>
      </div>
    </div>
    <style jsx>{`
      .content {
        padding: 60px 80px 60px 144px;
      }
    `}</style>
  </>
);

const EnhancedCollectionsLayout = React.memo(CollectionsLayout);

export default EnhancedCollectionsLayout;
