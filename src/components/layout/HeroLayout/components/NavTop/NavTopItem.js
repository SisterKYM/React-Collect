import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const NavTopItem = ({href, label, path}) => (
  <div className="f6 fw6 ttu">
    {href ? (
      <>
        {path.includes('mailto') ? (
          <a className="f-regular avenir-roman gray-600" href={path}>
            {label}
          </a>
        ) : (
          <Link className="fw6 gray-600" to={path}>
            {label}
          </Link>
        )}
      </>
    ) : (
      label
    )}
  </div>
);

NavTopItem.propTypes = {
  href: PropTypes.bool,
  label: PropTypes.string,
  path: PropTypes.string,
};

const EnhancedNavTopItem = React.memo(NavTopItem);

export default EnhancedNavTopItem;
