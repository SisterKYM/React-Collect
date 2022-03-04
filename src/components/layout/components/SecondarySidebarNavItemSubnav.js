import React from 'react';
import cx from 'classnames';
import {NavItem} from 'elements';

const SecondarySidebarNavItemSubnav = ({items, heading}) => (
  <div className="pa3 nav-item-highlight">
    <div className="ph2">
      {heading && <div className="mb2 f7 ttu dark-grey">{heading}</div>}
      {items.map((item, idx) => (
        <NavItem
          key={idx}
          {...item}
          className={cx('db f6 tint', idx !== 0 && 'mt2')}
        />
      ))}
    </div>
  </div>
);

const EnhancedSecondarySidebarNavItemSubnav = React.memo(
  SecondarySidebarNavItemSubnav
);

export default EnhancedSecondarySidebarNavItemSubnav;
