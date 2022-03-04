import PropTypes from 'prop-types';
import React from 'react';

import NavTopItem from './NavTopItem';

const NavTop = ({items}) => (
  <ul className="flex flex-wrap items-center">
    {items.map((item, key) => (
      <li className={key ? 'ml2' : ''} key={key}>
        <NavTopItem {...item} />
      </li>
    ))}
  </ul>
);

NavTop.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.bool,
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ),
};

const EnhancedNavTop = React.memo(NavTop);

export default EnhancedNavTop;
