import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {MdMenu} from 'react-icons/md';

import config from 'config';
import Logo from 'theme/images/logo-icon.png';

const CollectionsTopNavMobile = ({setSidebarVisible}) => {
  const toggleVisible = useCallback(() => {
    setSidebarVisible((prevVisible) => !prevVisible);
  }, [setSidebarVisible]);

  return (
    <>
      <div className="mobile_top_navbar flex items-center justify-between">
        <div className="mobile_top_navbar-left">
          <div className="flex gray-600">
            <MdMenu size={30} onClick={toggleVisible} />
          </div>
        </div>
        <Link to={config.links.homePageRedirect}>
          <img className="mobile_top_navbar-logo" src={Logo} alt="Logo" />
        </Link>
        <div className="mobile_top_navbar-right" />
      </div>
      <style>{`
        .mobile_top_navbar {
          padding: 1rem 1.5rem;
          height: 70px;
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 1px 3px #0000000a;
          border: 1px solid #eaedf3;
        }
        .mobile_top_navbar-left,
        .mobile_top_navbar-right {
          width: 25px;
        }
        .mobile_top_navbar-logo {
          display: block;
          width: 175px;
        }
      `}</style>
    </>
  );
};

export default React.memo(CollectionsTopNavMobile);
