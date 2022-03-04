import React from 'react';

const SidebarNavSection = ({label, children}) => (
  <div>
    <div className="relative pv2 pl2 f6 avenir-light bg-tint">
      <div className="relative flex pv2 ph3 items-center white ttu">
        {label}
      </div>
    </div>
    {children}
  </div>
);

const EnhancedSidebarNavSection = React.memo(SidebarNavSection);

export default EnhancedSidebarNavSection;
