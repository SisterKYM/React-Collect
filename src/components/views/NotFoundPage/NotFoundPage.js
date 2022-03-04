import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import React from 'react';

import {BasicLayout} from 'layout';
import {LoginSignupNav} from 'elements';
import {
  PrimaryNavLinksContainer,
  UserDrawerContainer,
  WithdrawButtonContainer,
} from 'containers';
import MilkCartonIcon from 'theme/images/MilkCarton.svg';

const NotFoundPage = ({location}) => {
  const session = useSelector(state => state.session);

  return (
    <BasicLayout
      className="bg-light-aqua"
      primaryNavbar={{
        leftComponent: <PrimaryNavLinksContainer />,
        centerComponent: <WithdrawButtonContainer />,
        rightComponent: (!session || !session.user) && (
          <LoginSignupNav location={location} />
        ),
      }}
      drawerMenuNav={<UserDrawerContainer />}
    >
      <div className="flex pt5">
        <div className="flex w-50 justify-end">
          <img alt="Mil carton" src={MilkCartonIcon} />
        </div>
        <div className="w-50">
          <h1 className="mb3">Whoops.</h1>
          <p className="f-regular avenir-roman">
            This page can&apos;t be found or
            <br />
            is currently unavailable.
            <br />
            <Link to="/contact">Contact us</Link> if you need help.
          </p>
        </div>
      </div>
      <style jsx>{`
        img {
          height: 250px;
        }
      `}</style>
    </BasicLayout>
  );
};

export default NotFoundPage;
