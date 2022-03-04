import {NavLink} from 'react-router-dom';
import React, {useCallback} from 'react';
import cx from 'classnames';

import {CommonButton} from 'elements';

const CollectionsSidebarMobileNavItem = ({
  nav,
  index,
  selectNav,
  subNavItem,
}) => {
  const navChild = (
    <>
      {nav.icon && <div className="icon-box">{nav.icon}</div>}
      {nav.type !== 'button' ? (
        <div className="text">
          <span className="avenir-roman gray-600 text-14">{nav.text}</span>
        </div>
      ) : (
        <CommonButton className="bg-gray-250 gray-600 pt-12 w-50">
          {nav.text}
        </CommonButton>
      )}
    </>
  );

  const selectSubNav = useCallback(() => {
    selectNav(index);
  }, [index, selectNav]);

  return (
    <>
      {nav.link ? (
        <>
          {nav.outer ? (
            <a
              href={nav.link}
              className={cx(
                'nav-item',
                subNavItem && 'subnav-item',
                !nav.icon && 'pl3',
                nav.type !== 'button' && 'link'
              )}
              target={nav.target}
            >
              {navChild}
            </a>
          ) : (
            <NavLink
              to={nav.link}
              exact
              className={cx(
                'nav-item',
                subNavItem && 'subnav-item',
                !nav.icon && 'pl3',
                nav.type !== 'button' && 'link'
              )}
              target={nav.target}
            >
              {navChild}
            </NavLink>
          )}
        </>
      ) : (
        <div
          className={cx('nav-item small-view', subNavItem && 'subnav-item')}
          onClick={selectSubNav}
        >
          {nav.icon && (
            <div className={cx('icon-box', nav.className ? nav.className : '')}>
              {nav.icon}
            </div>
          )}
          <div className="text">
            <span className="avenir-roman gray-600 text-14 text">
              {nav.text}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const EnhancedCollectionsSidebarMobileNavItem = React.memo(
  CollectionsSidebarMobileNavItem
);

export default EnhancedCollectionsSidebarMobileNavItem;
