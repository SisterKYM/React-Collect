import React from 'react';

import CollectionCenterLayout from 'layout/CollectionCenterLayout';
import {SecondaryNavbarMobile, Sidebar} from './components';

const CollectionLayout = ({collection, navItems, footer, children}) => (
  <CollectionCenterLayout collection={collection} footer={footer}>
    {Array.isArray(navItems) && navItems.length > 0 ? (
      <>
        <div className="dn-l">
          <SecondaryNavbarMobile navItems={navItems} collection={collection} />
        </div>
        <div className="flex min-h-100">
          <div className="dn db-l">
            <Sidebar navItems={navItems} collection={collection} />
          </div>
          <div className="flex-auto">{children}</div>
        </div>
        <style jsx>{`
          :global(.items-nav) {
            width: 14rem;
          }
          :global(.collection-sidebar-not-large) {
            max-height: 4.375rem;
          }
        `}</style>
      </>
    ) : (
      children
    )}
  </CollectionCenterLayout>
);

const EnhancedCollectionLayout = React.memo(CollectionLayout);

export default EnhancedCollectionLayout;
