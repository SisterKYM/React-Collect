import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';
import useOnClickOutside from 'use-onclickoutside';

const LinksMenu = ({className, links, onDismiss}) => {
  const containerRef = React.useRef(null);

  useOnClickOutside(containerRef, onDismiss);

  return (
    <ul ref={containerRef} className={className}>
      {links.map((link, idx) => (
        <li
          key={link.to}
          className={cx(link.mobileOnly && 'dn-ns', idx !== 0 && 'mt3')}
        >
          <Link
            className={cx('f6', link.classic ? 'tint' : 'gray-600')}
            to={link.to}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const EnhancedLinksMenu = React.memo(LinksMenu);

export default EnhancedLinksMenu;
