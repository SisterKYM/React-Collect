import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {IoIosMenu} from 'react-icons/io';
import cx from 'classnames';
import posed, {PoseGroup} from 'react-pose';

import config from 'config';
import CheddarUpLogo from 'theme/images/cheddarup-logo.svg';

const NavLi = ({className, onClick, to, children}) => (
  <li className="bb b--gray-300">
    <Link
      replace
      className={cx('dib w-100 h-100 pa3 f6 avennir-roman gray-600', className)}
      onClick={onClick}
      to={to || '#'}
    >
      {children}
    </Link>
  </li>
);

const AnimatedSidebar = posed.div({
  enter: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 200,
    },
  },
  exit: {
    x: '-100%',
    transition: {
      duration: 150,
    },
  },
});

const NavBarMobile = ({userSlug}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const showMenu = useCallback(() => {
    setMenuVisible(true);
  }, []);
  const hideMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  return (
    <nav className="dn-ns w-100 border-box pa3 bb b--gray-300 bg-white">
      <div>
        <IoIosMenu className="f2 gray-600 dim" onClick={showMenu} />
      </div>
      <PoseGroup>
        {menuVisible && (
          <AnimatedSidebar
            key={menuVisible}
            className="z-999 absolute vh-100 bg-white left-0 top-0 vertical-flex justify-between"
            withParent={false}
          >
            <div className="flex-auto overflow-scroll">
              <nav>
                <ul>
                  <NavLi className="ttu" to="/" onClick={hideMenu}>
                    Home
                  </NavLi>
                  <NavLi
                    className="ttu"
                    to={`/me/${userSlug}/share`}
                    onClick={hideMenu}
                  >
                    Share
                  </NavLi>
                  <NavLi
                    className="ttu"
                    to={`/me/${userSlug}/help`}
                    onClick={hideMenu}
                  >
                    Help
                  </NavLi>
                </ul>
              </nav>
            </div>
            {config.isCheddarUp && (
              <footer className="ph3 bg-gray-200">
                <img alt="CheddarUp logo" src={CheddarUpLogo} />
              </footer>
            )}
          </AnimatedSidebar>
        )}
      </PoseGroup>
      {menuVisible && (
        <div
          className="absolute--fill bg-dark-gray o-40 absolute z-5"
          onClick={hideMenu}
        />
      )}
      <style jsx>{`
        footer {
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
        }
        :global(.payer-menu-modal-content-container) {
          max-width: 70%;
          bottom: 0;
          top: 0;
          margin: 0rem !important;
        }
        :global(.flex-shrink-0) {
          flex-shrink: 0;
        }
      `}</style>
    </nav>
  );
};

const EnhancedNavBarMobile = React.memo(NavBarMobile);

export default EnhancedNavBarMobile;
