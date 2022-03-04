import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import cx from 'classnames';

import {Logo} from 'elements';

import NavBarMobile from './NavBarMobile';

const linkClassName = 'link dim gray-600 f6 dib ttu';

const NavBar = () => {
  const userSlug = useSelector((state) => state.session?.user?.slug);

  return (
    <>
      <nav className="dn dt-ns w-100 border-box ph5 pv3 bb b--gray-300 bg-white">
        <Link className="dtc v-mid link dim w-25" to="/">
          <div className="flex">
            <Logo />
          </div>
        </Link>
        <div className="dtc v-mid tr">
          <Link className={linkClassName} to={`/me/${userSlug}/help`}>
            Help
          </Link>
          <Link
            className={cx(linkClassName, 'ml3 ml4-m ml5-l')}
            to={`/me/${userSlug}/share`}
          >
            Share
          </Link>
        </div>
      </nav>
      <NavBarMobile userSlug={userSlug} />
    </>
  );
};

const EnhancedNavBar = React.memo(NavBar);

export default EnhancedNavBar;
