import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

const NavItem = ({className, light, to, href, target, onClick, children}) => {
  const Component = React.useMemo(() => {
    if (to) {
      return Link;
    }

    return href ? 'a' : 'span';
  }, [href, to]);

  return (
    <Component
      className={cx(
        'f6 pointer',
        light ? 'avenir-light silver f9-ns' : 'avenir-roman dark-grey',
        className
      )}
      href={href}
      to={to}
      target={target}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

const EnhancedNavItem = React.memo(NavItem);

export default EnhancedNavItem;
