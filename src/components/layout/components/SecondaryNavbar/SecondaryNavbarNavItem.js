import {Link} from 'react-router-dom';
import React from 'react';
import cx from 'classnames';

import {colors} from 'theme/constants';

const getContainerClassName = ({active, disabled}) => {
  const commonClassName =
    'relative flex justify-center items-center f4 hover-white';

  if (disabled) {
    return cx(
      'secondary-navbar-nav-item-item secondary-navbar-nav-item-disabled-item o-50',
      commonClassName
    );
  }

  return active
    ? cx(
        'secondary-navbar-nav-item-item secondary-navbar-nav-item-active-item white',
        commonClassName
      )
    : cx('secondary-navbar-nav-item-item', 'gray-300', commonClassName);
};

const SecondaryNavbarNavItem = ({active, to, children, disabled}) => {
  const containerClassName = getContainerClassName({active, disabled});

  return (
    <>
      {disabled ? (
        <div className={containerClassName}>
          <div className="secondary-navbar-nav-item-curtain absolute top-0 left-0 w-100 h-100" />
          {children}
        </div>
      ) : (
        <Link to={to}>
          <span className={containerClassName}>{children}</span>
        </Link>
      )}
      <style jsx>{`
        .secondary-navbar-nav-item-item {
          min-height: 60px;
          height: 5vh;
          max-height: 60px;
          width: 100px;
        }
        @media (max-width: 400px) {
          .secondary-navbar-nav-item-item {
            width: 75px;
          }
        }
        .secondary-navbar-nav-item-disabled-item:hover {
          cursor: not-allowed;
        }
        .secondary-navbar-nav-item-active-item:after,
        .secondary-navbar-nav-item-item:hover:after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 0px;
          width: 100%;
          height: 5px;
          background-color: ${colors.primary};
        }
        .secondary-navbar-nav-item-curtain {
          // background-color: #37373799;
        }
      `}</style>
    </>
  );
};

const EnhancedSecondaryNavbarNavItem = React.memo(SecondaryNavbarNavItem);

export default EnhancedSecondaryNavbarNavItem;
