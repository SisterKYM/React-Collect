import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom';

import {Logo} from 'elements';
import useMedia from 'hooks/useMedia';

const ThankYouPage = () => {
  const {notSmall} = useMedia();

  return (
    <div className="vh-100 overflow-hidden vertical-flex">
      <div className="top-nav">
        <Link to="/" className="pointer">
          <Logo />
        </Link>
      </div>
      <div className="vertical-flex justify-center items-center flex-fill">
        <h1 className="mb2 merriweather text-34 tc i gray-350">
          Thank you for using Cheddar Up
        </h1>
        <div className={cx('pa3 bg-white tc', notSmall ? 'w-35' : '')}>
          <p className="avenir-light text-16 gray-700">
            Your account has been deleted. We’re sorry to see you go, but we’re
            here should you need us in the future.
          </p>
        </div>
      </div>
      <style>{`
        .text-34 {
          font-size: 34px;
          line-height: 44px;
        }
        .top-nav {
          padding: 1rem 1.5rem;
          height: 70px;
          background: #ffffff 0% 0% no-repeat padding-box;
          box-shadow: 0px 1px 3px #0000000a;
          border: 1px solid #eaedf3;
        }
        .w-35 {
          width: 35%;
        }
      `}</style>
    </div>
  );
};

const EnhancedThankYouPage = React.memo(ThankYouPage);

export default EnhancedThankYouPage;
