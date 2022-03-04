import React from 'react';
import CollectionsSidebarMobileNavItem from './CollectionsSidebarMobileNavItem';

const CollectionsSidebarMobileSubNav = ({nav, children}) => (
  <>
    {children}
    <div className="nav-item subnav-item active">
      <div className="icon-box">{nav.icon}</div>
      <div className="text">
        <span className="avenir-roman gray-600 text-14 text">{nav.text}</span>
      </div>
    </div>
    {nav.subNavs.map((nav, index) => (
      <CollectionsSidebarMobileNavItem
        key={index}
        index={index}
        nav={nav}
        subNavItem
      />
    ))}
  </>
);

export default React.memo(CollectionsSidebarMobileSubNav);
