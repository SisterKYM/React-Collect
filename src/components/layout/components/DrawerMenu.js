import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import cx from 'classnames';
import useOnClickOutside from 'use-onclickoutside';

import {change} from 'redux/modules/drawerMenu/actions';
import {Z_INDEX as curtainZindex} from 'elements/Curtain';

const zIndex = curtainZindex + 3;

const DrawerMenu = ({children, right}) => {
  const childrenWrapperRef = React.useRef(null);
  const dispatch = useDispatch();
  const drawerMenu = useSelector((state) => state.drawerMenu);

  useOnClickOutside(childrenWrapperRef, () => {
    dispatch(change({open: false}));
  });

  return (
    <>
      <div
        ref={childrenWrapperRef}
        className={cx(
          'drawer-menu children-wrapper pa3 absolute bg-white shadow-4',
          drawerMenu.className,
          drawerMenu.open && 'opened'
        )}
      >
        {children}
      </div>
      <style jsx>{`
        :global(.drawer-menu.children-wrapper) {
          z-index: ${zIndex};
          top: ${drawerMenu.finish}px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.1s linear;
          width: 200px;
          ${right ? 'right: 0;' : ''}
        }
        :global(.drawer-menu.children-wrapper.opened) {
          opacity: 1;
          pointer-events: unset;
        }
      `}</style>
    </>
  );
};

const EnhancedDrawerMenu = Object.assign(React.memo(DrawerMenu));

export {zIndex};
export default EnhancedDrawerMenu;
