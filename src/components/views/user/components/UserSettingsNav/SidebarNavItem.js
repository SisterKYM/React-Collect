import {Link} from 'react-router-dom';
import React from 'react';

const SidebarNavItem = ({active, to, label}) => (
  <div className="relative f6 avenir-roman">
    {Boolean(active) && <i className="absolute absolute--fill o-60 bg-white" />}
    <Link to={to} className="db pv2 pl2 nowrap overflow-hidden">
      <div className="relative flex ph3 pv2 lh-copy items-center gray-600">
        {label}
      </div>
    </Link>
  </div>
);

const EnhancedSidebarNavItem = React.memo(SidebarNavItem);

export default EnhancedSidebarNavItem;
